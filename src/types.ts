interface AccountItem {
  id: number;
  tags: string;
  type: ERECORD_TYPES;
  login: string;
  password: string | null;
}

interface TagItem {
  text: string;
}

type LSAccountItem = Omit<AccountItem, 'tags'> & { tags: TagItem[] }

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
  type LSAccountItem,
  ERECORD_TYPES,
  RECORD_TYPES,
}