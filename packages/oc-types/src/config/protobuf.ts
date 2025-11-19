/**
 * Protobuf configuration for gRPC collections
 */

export interface ProtoFile {
  type: 'file';
  path: string;
}

export type ProtoFileItem = ProtoFile;

export interface ProtoFileImportPath {
  path: string;
  disabled?: boolean;
}

export interface Protobuf {
  /**
   * Property name follows the schema spelling (protofFiles)
   */
  protofFiles?: ProtoFileItem[];
  importPaths?: ProtoFileImportPath[];
}
