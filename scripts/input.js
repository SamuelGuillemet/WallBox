const questionPuissance = [
    {
        name: 'puissance',
        type: 'input',
        message:
            'Quelle est la puissance à partir de laquelle voulez vous charger ?',
        validate: (value) => {
            if (value.match(/^-[0-9]+$/)) {
                return true;
            }
            return 'La puissance doit être un nombre du type "-100"';
        },
        default: '-450',
    },
];

module.exports = { questionPuissance };
