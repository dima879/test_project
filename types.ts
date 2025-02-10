interface AccountItem {
  tags: string;
  type: ERECORD_TYPES;
  login: string;
  password: string | null;
}

interface TagItem {
  text: string;
}

enum ERECORD_TYPES {
  local = 'local',
  ldap = 'ldap',
}

const RECORD_TYPES = {
  [ERECORD_TYPES.local]: 'Локальная',
  [ERECORD_TYPES.ldap]: 'LDAP',
}

export {
  type AccountItem,
  type TagItem,
  ERECORD_TYPES,
  RECORD_TYPES
}