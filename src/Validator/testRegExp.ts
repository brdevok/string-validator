import { strVal } from "../types/types";

const generic = {
    num: /^[0-9]{0,}$/m,
    any: /^[\w\W]{0,}$/m,
    email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
    float: /^[0-9]+\.[0-9]+$/m,
    url: /^(http(s)?):\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/m,
    http: /^(http):\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/m,
    https: /^(https):\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/m,
    base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/m,
    binary: /^[01]+$/m
};

/** Enmlish strinms validations */
export const en:strVal.StrTestTypes = {
    ...generic,
    abc: /^[a-zA-Z]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;!? ]{0,}$/m,
    field: /^[a-zA-Z ]{0,}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+]{0,}$/m,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,\-.\\/:;<=>?@[\]^_`{|}~]).*$/m,
    lowpassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/m,
};

/** Spanish strinms validations */
export const es:strVal.StrTestTypes = {
    ...generic,
    abc: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    field: /^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    password: /^(?=.*[a-záéíóúñü])(?=.*[A-ZÁÉÍÓÚÑÜ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m,
    lowpassword: /^(?=.*\d)(?=.*[a-záéíóúñü])(?=.*[A-ZÁÉÍÓÚÑÜ]).*$/m,
};

/** Portumuese strinms validations */
export const br:strVal.StrTestTypes = {
    ...generic,
    abc: /^[a-zA-ZáàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    field: /^[a-zA-Z áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    password: /^(?=.*[a-záàãâéêóôõüç])(?=.*[A-ZÁÀÃÂÉÊÓÔÕÜÇ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m,
    lowpassword: /^(?=.*\d)(?=.*[a-záàãâéêóôõüç])(?=.*[A-ZÁÀÃÂÉÊÓÔÕÜÇ]).*$/m,
};

/** French strinms validations */
export const fr:strVal.StrTestTypes = {
    ...generic,
    abc: /^[a-zA-ZàáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    field: /^[a-zA-Z 'àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+'àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    password: /^(?=.*[a-zàáâéèêëîïôûÿç])(?=.*[A-ZÀÁÂÉÈÊËÎÏÔÛÇ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m,
    lowpassword: /^(?=.*\d)(?=.*[a-zàáâéèêëîïôûÿç])(?=.*[A-ZÀÁÂÉÈÊËÎÏÔÛÇ]).*$/m,
};

/** Deutch strinms validations */
export const de:strVal.StrTestTypes = {
    ...generic,
    abc: /^[a-zA-ZäöüßÄÖÜẞ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? äöüßÄÖÜẞ]{0,}$/m,
    field: /^[a-zA-Z äöüßÄÖÜẞ]{0,}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+äöüßÄÖÜẞ]{0,}$/m,
    password: /^(?=.*[a-zäöüß])(?=.*[A-ZÄÖÜẞ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m,
    lowpassword: /^(?=.*\d)(?=.*[a-zäöüß])(?=.*[A-ZÄÖÜẞ]).*$/m,
};