/**
 * Converts Bruno collection format to OpenCollection format
 * @param {Object} brunoCollection - Bruno collection object
 * @returns {Object} OpenCollection format object
 */
const brunoToOpenCollection = (brunoCollection) => {
  if (!brunoCollection) {
    throw new Error('Bruno collection is required');
  }

  const openCollection = {
    name: brunoCollection.name || 'Untitled Collection',
  };

  // Add description if present
  if (brunoCollection.root?.docs) {
    openCollection.description = brunoCollection.root.docs;
  }

  // Convert environments
  if (brunoCollection.environments && brunoCollection.environments.length > 0) {
    openCollection.environments = brunoCollection.environments.map(convertEnvironment);
  }

  // Convert items (requests and folders)
  if (brunoCollection.items && brunoCollection.items.length > 0) {
    openCollection.items = brunoCollection.items.map(convertItem);
  }

  // Convert base configuration from root
  if (brunoCollection.root) {
    openCollection.base = convertBase(brunoCollection.root);
  }

  // Add docs if present at root level
  if (brunoCollection.root?.docs) {
    openCollection.docs = brunoCollection.root.docs;
  }

  return openCollection;
};

/**
 * Converts Bruno environment to OpenCollection environment
 */
function convertEnvironment(brunoEnv) {
  const env = {
    name: brunoEnv.filename?.replace('.bru', '') || 'Unnamed Environment'
  };

  if (brunoEnv.variables && brunoEnv.variables.length > 0) {
    env.variables = brunoEnv.variables.map(convertVariable);
  }

  return env;
}

/**
 * Converts Bruno variable to OpenCollection variable
 */
function convertVariable(brunoVar) {
  const variable = {
    name: brunoVar.name
  };

  // Handle value
  if (brunoVar.value !== undefined && brunoVar.value !== null) {
    variable.value = brunoVar.value;
  } else {
    variable.value = null;
  }

  // Handle disabled state (Bruno uses 'enabled', OpenCollection uses 'disabled')
  if (brunoVar.enabled === false) {
    variable.disabled = true;
  }

  // Handle transient/secret variables (Bruno uses 'secret')
  if (brunoVar.secret === true) {
    variable.transient = true;
  }

  return variable;
}

/**
 * Converts Bruno base/root configuration to OpenCollection base
 */
function convertBase(brunoRoot) {
  const base = {};

  // Convert headers
  if (brunoRoot.request?.headers && brunoRoot.request.headers.length > 0) {
    base.headers = brunoRoot.request.headers.map(convertHeader);
  }

  // Convert auth
  if (brunoRoot.request?.auth) {
    const auth = convertAuth(brunoRoot.request.auth);
    if (auth) {
      base.auth = auth;
    }
  }

  // Convert variables
  if (brunoRoot.request?.vars?.req && brunoRoot.request.vars.req.length > 0) {
    base.variables = brunoRoot.request.vars.req.map(convertVariable);
  }

  // Convert scripts
  const scripts = convertScripts(brunoRoot.request);
  if (scripts && Object.keys(scripts).length > 0) {
    base.scripts = scripts;
  }

  return Object.keys(base).length > 0 ? base : undefined;
}

/**
 * Converts Bruno item (request or folder) to OpenCollection item
 */
function convertItem(brunoItem) {
  if (brunoItem.type === 'folder') {
    return convertFolder(brunoItem);
  } else if (brunoItem.type === 'http-request') {
    return convertHttpRequest(brunoItem);
  } else if (brunoItem.type === 'graphql-request') {
    return convertGraphQLRequest(brunoItem);
  }
  
  // Default fallback
  return null;
}

/**
 * Converts Bruno folder to OpenCollection folder
 */
function convertFolder(brunoFolder) {
  const folder = {
    type: 'folder',
    name: brunoFolder.name
  };

  // Convert items recursively
  if (brunoFolder.items && brunoFolder.items.length > 0) {
    folder.items = brunoFolder.items.map(convertItem).filter(item => item !== null);
  }

  // Convert folder-level configuration from root
  if (brunoFolder.root) {
    if (brunoFolder.root.request?.headers && brunoFolder.root.request.headers.length > 0) {
      folder.headers = brunoFolder.root.request.headers.map(convertHeader);
    }

    if (brunoFolder.root.request?.auth) {
      const auth = convertAuth(brunoFolder.root.request.auth);
      if (auth) {
        folder.auth = auth;
      }
    }

    if (brunoFolder.root.request?.vars?.req && brunoFolder.root.request.vars.req.length > 0) {
      folder.variables = brunoFolder.root.request.vars.req.map(convertVariable);
    }

    const scripts = convertScripts(brunoFolder.root.request);
    if (scripts && Object.keys(scripts).length > 0) {
      folder.scripts = scripts;
    }

    if (brunoFolder.root.docs) {
      folder.docs = brunoFolder.root.docs;
    }
  }

  return folder;
}

/**
 * Converts Bruno HTTP request to OpenCollection HTTP request
 */
function convertHttpRequest(brunoRequest) {
  const request = {
    type: 'http',
    name: brunoRequest.name
  };

  // Basic request properties
  if (brunoRequest.request?.url) {
    request.url = brunoRequest.request.url;
  }

  if (brunoRequest.request?.method) {
    request.method = brunoRequest.request.method;
  }

  // Convert params
  if (brunoRequest.request?.params && brunoRequest.request.params.length > 0) {
    request.params = brunoRequest.request.params.map(convertParam);
  }

  // Convert headers
  if (brunoRequest.request?.headers && brunoRequest.request.headers.length > 0) {
    request.headers = brunoRequest.request.headers.map(convertHeader);
  }

  // Convert body
  if (brunoRequest.request?.body) {
    const body = convertBody(brunoRequest.request.body);
    if (body) {
      request.body = body;
    }
  }

  // Convert auth
  if (brunoRequest.request?.auth) {
    const auth = convertAuth(brunoRequest.request.auth);
    if (auth) {
      request.auth = auth;
    }
  }

  // Convert scripts
  const scripts = convertScripts(brunoRequest.request);
  if (scripts && Object.keys(scripts).length > 0) {
    request.scripts = scripts;
  }

  // Convert variables
  if (brunoRequest.request?.vars?.req && brunoRequest.request.vars.req.length > 0) {
    request.variables = brunoRequest.request.vars.req.map(convertVariable);
  }

  // Convert assertions
  if (brunoRequest.request?.assertions && brunoRequest.request.assertions.length > 0) {
    request.assertions = brunoRequest.request.assertions.map(convertAssertion);
  }

  // Add docs
  if (brunoRequest.request?.docs) {
    request.docs = brunoRequest.request.docs;
  }

  return request;
}

/**
 * Converts Bruno GraphQL request to OpenCollection GraphQL request
 */
function convertGraphQLRequest(brunoRequest) {
  // Basic implementation - can be extended based on GraphQL schema requirements
  return {
    type: 'graphql',
    name: brunoRequest.name
  };
}

/**
 * Converts Bruno header to OpenCollection header
 */
function convertHeader(brunoHeader) {
  const header = {
    name: brunoHeader.name,
    value: brunoHeader.value
  };

  if (brunoHeader.enabled === false) {
    header.disabled = true;
  }

  return header;
}

/**
 * Converts Bruno param to OpenCollection param
 */
function convertParam(brunoParam) {
  const param = {
    name: brunoParam.name,
    value: brunoParam.value,
    type: brunoParam.type || 'query'
  };

  if (brunoParam.enabled !== undefined) {
    param.enabled = brunoParam.enabled;
  }

  return param;
}

/**
 * Converts Bruno body to OpenCollection body
 */
function convertBody(brunoBody) {
  if (!brunoBody || !brunoBody.mode) {
    return null;
  }

  switch (brunoBody.mode) {
    case 'json':
      return {
        type: 'json',
        data: brunoBody.json || ''
      };

    case 'text':
      return {
        type: 'text',
        data: brunoBody.text || ''
      };

    case 'xml':
      return {
        type: 'xml',
        data: brunoBody.xml || ''
      };

    case 'sparql':
      return {
        type: 'sparql',
        data: brunoBody.sparql || ''
      };

    case 'formUrlEncoded':
      if (brunoBody.formUrlEncoded && brunoBody.formUrlEncoded.length > 0) {
        return brunoBody.formUrlEncoded.map(item => ({
          name: item.name,
          value: item.value,
          enabled: item.enabled !== false
        }));
      }
      return null;

    case 'multipartForm':
      if (brunoBody.multipartForm && brunoBody.multipartForm.length > 0) {
        return brunoBody.multipartForm.map(item => ({
          name: item.name,
          type: item.type || 'text',
          value: item.value,
          enabled: item.enabled !== false
        }));
      }
      return null;

    case 'file':
      if (brunoBody.file && brunoBody.file.length > 0) {
        return brunoBody.file.map(item => ({
          filePath: item.filePath,
          contentType: item.contentType || '',
          selected: item.selected !== false
        }));
      }
      return null;

    default:
      return null;
  }
}

/**
 * Converts Bruno auth to OpenCollection auth
 */
function convertAuth(brunoAuth) {
  if (!brunoAuth || !brunoAuth.mode || brunoAuth.mode === 'none' || brunoAuth.mode === 'inherit') {
    return null;
  }

  switch (brunoAuth.mode) {
    case 'basic':
      return {
        type: 'basic',
        username: brunoAuth.basic?.username || '',
        password: brunoAuth.basic?.password || ''
      };

    case 'bearer':
      return {
        type: 'bearer',
        token: brunoAuth.bearer?.token || ''
      };

    case 'digest':
      return {
        type: 'digest',
        username: brunoAuth.digest?.username || '',
        password: brunoAuth.digest?.password || ''
      };

    case 'awsv4':
      return {
        type: 'awsv4',
        accessKeyId: brunoAuth.awsv4?.accessKeyId || '',
        secretAccessKey: brunoAuth.awsv4?.secretAccessKey || '',
        sessionToken: brunoAuth.awsv4?.sessionToken,
        service: brunoAuth.awsv4?.service,
        region: brunoAuth.awsv4?.region,
        profileName: brunoAuth.awsv4?.profileName
      };

    case 'wsse':
      return {
        type: 'wsse',
        username: brunoAuth.wsse?.username || '',
        password: brunoAuth.wsse?.password || ''
      };

    case 'ntlm':
      return {
        type: 'ntlm',
        username: brunoAuth.ntlm?.username || '',
        password: brunoAuth.ntlm?.password || '',
        domain: brunoAuth.ntlm?.domain
      };

    default:
      return null;
  }
}

/**
 * Converts Bruno scripts to OpenCollection scripts
 */
function convertScripts(brunoRequest) {
  if (!brunoRequest || !brunoRequest.script) {
    return null;
  }

  const scripts = {};

  if (brunoRequest.script.req) {
    scripts.preRequest = brunoRequest.script.req;
  }

  if (brunoRequest.script.res) {
    scripts.postResponse = brunoRequest.script.res;
  }

  if (brunoRequest.tests) {
    scripts.tests = brunoRequest.tests;
  }

  return Object.keys(scripts).length > 0 ? scripts : null;
}

/**
 * Converts Bruno assertion to OpenCollection assertion
 */
function convertAssertion(brunoAssertion) {
  // Bruno format: { name: "res.status", value: "eq 200", enabled: true }
  // Need to parse the value to extract operator and expected value
  
  const assertion = {
    expression: brunoAssertion.name || '',
    operator: '',
    value: ''
  };

  if (brunoAssertion.value) {
    // Parse operator and value from strings like "eq 200", "contains text", etc.
    const parts = brunoAssertion.value.trim().split(/\s+(.+)/);
    if (parts.length >= 1) {
      assertion.operator = parts[0];
      assertion.value = parts[1] || '';
    }
  }

  if (brunoAssertion.enabled !== undefined) {
    assertion.enabled = brunoAssertion.enabled;
  }

  return assertion;
}

module.exports = {
  brunoToOpenCollection
}