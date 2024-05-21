function trenURL(str) {
    const tr = {
        'ç': 'c',
        'Ç': 'C',
        'ğ': 'g',
        'Ğ': 'G',
        'ı': 'i',
        'I': 'I',
        'İ': 'I',
        'ö': 'o',
        'Ö': 'O',
        'ş': 's',
        'Ş': 'S',
        'ü': 'u',
        'Ü': 'U',
    };

    str = str.replace(/\s+/g, '-');

    for (let [turkce, ingilizce] of Object.entries(tr)) {
        const regex = new RegExp(turkce, 'g');
        str = str.replace(regex, ingilizce);
    }

    return str;
}

export  { trenURL };
