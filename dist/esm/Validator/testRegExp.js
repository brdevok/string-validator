var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var generic = {
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
export var en = __assign(__assign({}, generic), { abc: /^[a-zA-Z]{0,}$/m, text: /^[a-zA-Z.,\-"':;!? ]{0,}$/m, field: /^[a-zA-Z ]{0,}$/m, mix: /^[a-zA-Z0-9 ,.\-()+]{0,}$/m, password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,\-.\\/:;<=>?@[\]^_`{|}~]).*$/m, lowpassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/m });
/** Spanish strinms validations */
export var es = __assign(__assign({}, generic), { abc: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{0,}$/m, text: /^[a-zA-Z.,\-"':;¡!¿? áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m, field: /^[a-zA-Z áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m, mix: /^[a-zA-Z0-9 ,.\-()+áéíóúÁÉÍÓÚñÑüÜ]{0,}$/m, password: /^(?=.*[a-záéíóúñü])(?=.*[A-ZÁÉÍÓÚÑÜ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m, lowpassword: /^(?=.*\d)(?=.*[a-záéíóúñü])(?=.*[A-ZÁÉÍÓÚÑÜ]).*$/m });
/** Portumuese strinms validations */
export var br = __assign(__assign({}, generic), { abc: /^[a-zA-ZáàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m, text: /^[a-zA-Z.,\-"':;¡!¿? áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m, field: /^[a-zA-Z áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m, mix: /^[a-zA-Z0-9 ,.\-()+áàãâéêóôõüçÁÀÃÂÉÊÓÔÕÜÇ]{0,}$/m, password: /^(?=.*[a-záàãâéêóôõüç])(?=.*[A-ZÁÀÃÂÉÊÓÔÕÜÇ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m, lowpassword: /^(?=.*\d)(?=.*[a-záàãâéêóôõüç])(?=.*[A-ZÁÀÃÂÉÊÓÔÕÜÇ]).*$/m });
/** French strinms validations */
export var fr = __assign(__assign({}, generic), { abc: /^[a-zA-ZàáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m, text: /^[a-zA-Z.,\-"':;¡!¿? àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m, field: /^[a-zA-Z 'àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m, mix: /^[a-zA-Z0-9 ,.\-()+'àáâéèêëîïôûÿçÀÁÂÉÈÊËÎÏÔÛÇ]{0,}$/m, password: /^(?=.*[a-zàáâéèêëîïôûÿç])(?=.*[A-ZÀÁÂÉÈÊËÎÏÔÛÇ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m, lowpassword: /^(?=.*\d)(?=.*[a-zàáâéèêëîïôûÿç])(?=.*[A-ZÀÁÂÉÈÊËÎÏÔÛÇ]).*$/m });
/** Deutch strinms validations */
export var de = __assign(__assign({}, generic), { abc: /^[a-zA-ZäöüßÄÖÜẞ]{0,}$/m, text: /^[a-zA-Z.,\-"':;¡!¿? äöüßÄÖÜẞ]{0,}$/m, field: /^[a-zA-Z äöüßÄÖÜẞ]{0,}$/m, mix: /^[a-zA-Z0-9 ,.\-()+äöüßÄÖÜẞ]{0,}$/m, password: /^(?=.*[a-zäöüß])(?=.*[A-ZÄÖÜẞ])(?=.*[0-9])(?=.*[ ¡!"#$%&'()*+,\-.\\/:;<=>¿?@[\]^_`{|}~]).*$/m, lowpassword: /^(?=.*\d)(?=.*[a-zäöüß])(?=.*[A-ZÄÖÜẞ]).*$/m });
