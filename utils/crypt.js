const textToAsciis = (s) => {
    return s.split("").map((c) => c.charCodeAt(0));
};

const asciisToText = (asciis) => {
    return asciis.map((a) => String.fromCharCode(a)).join("");
};

const customReduce = (arr, initialValue) => {
    return arr.reduce((a, b) => a ^ b, initialValue);
};

const asciisToHexString = (asciis) => {
    return asciis
        .map((a) => ("000" + Number(a).toString(16)).slice(-4))
        .join("");
};

const hexStringToAsciis = (hexString) => {
    return hexString.match(/.{1,4}/g).map((hex) => parseInt(hex, 16));
};

const encrypt = (text, salt) => {
    const saltAsciis = textToAsciis(salt);

    return asciisToHexString(
        textToAsciis(text).map((a) => customReduce(saltAsciis, a))
    );
};

const decrypt = (text, salt) => {
    const saltAsciis = textToAsciis(salt);

    return asciisToText(
        hexStringToAsciis(text).map((a) => customReduce(saltAsciis, a))
    );
};

export { encrypt, decrypt };
