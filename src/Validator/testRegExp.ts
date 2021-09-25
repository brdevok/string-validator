import { strVal } from "../types/types";

/** English strings validations */
export const en:strVal.StrTestTypes = {
    any: /^[\w\W]{0,}$/m,
    abc: /^[a-zA-Z]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;!? ]{0,}$/m,
    num: /^[0-9]{0,}$/m,
    field: /^[a-zA-Z ]{0,}$/m,
    email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+]{0,}$/m,
    float: /^[0-9]+\.[0-9]+$/m,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,\-.\\/:;<=>?@[\]^_`{|}~]).*$/m
};

/** Spanish strings validations */
export const es:strVal.StrTestTypes = {
    any: /^[\w\W]{0,}$/m,
    abc: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    num: /^[0-9]{0,}$/m,
    field: /^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m,
    float: /^[0-9]+\.[0-9]+$/m,
    password: /^(?=.*[a-záéíóúñü])(?=.*[A-ZÁÉÍÓÚÑÜ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m
}

/** Portuguese strings validations */
export const br:strVal.StrTestTypes = {
    any: /^[\w\W]{0,}$/m,
    abc: /^[a-zA-ZáàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    num: /^[0-9]{0,}$/m,
    field: /^[a-zA-Z áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m,
    float: /^[0-9]+\.[0-9]+$/m,
    password: /^(?=.*[a-záàãâéêóôõüç])(?=.*[A-ZÁÀÃÂÉÊÓÔÕÜÇ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m
}

/** French strings validations */
export const fr:strVal.StrTestTypes = {
    any: /^[\w\W]{0,}$/m,
    abc: /^[a-zA-ZàáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    num: /^[0-9]{0,}$/m,
    field: /^[a-zA-Z 'àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+'àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m,
    float: /^[0-9]+\.[0-9]+$/m,
    password: /^(?=.*[a-zàáâéèêëîïôûÿç])(?=.*[A-ZÀÁÂÉÈÊËÎÏÔÛÇ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m
}

/** Deutch strings validations */
export const de:strVal.StrTestTypes = {
    any: /^[\w\W]{0,}$/m,
    abc: /^[a-zA-ZäöüßÄÖÜẞ]{0,}$/m,
    text: /^[a-zA-Z.,\-"':;¡!¿? äöüßÄÖÜẞ]{0,}$/m,
    num: /^[0-9]{0,}$/m,
    field: /^[a-zA-Z äöüßÄÖÜẞ]{0,}$/m,
    email: /^[^@]+@[a-zA-Z0-9\-]+(\.[a-zA-Z]+){1,3}$/m,
    mix: /^[a-zA-Z0-9 ,.\-()+äöüßÄÖÜẞ]{0,}$/m,
    float: /^[0-9]+\.[0-9]+$/m,
    password: /^(?=.*[a-zäöüß])(?=.*[A-ZÄÖÜẞ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m
}