var CONFIGS = {

    dictionary: {
        STR_NO_CONNECTION: {
            it: ['Connessione limitata o assente'],
            en: ['Limited or no connection'],
            es: ['Operación en trámite'],
            pt: ['Restrição ou sem ligação'],
            de: ['Eingeschränkte oder keine Verbindung'],
            fr: ['Problème de connexion']
        },
	STR_NO_CONNECTION_TXT: {
            it: ['Siamo spiacenti, il servizio non può essere erogato a causa della connessione limitata o assente. Verifica la connessione e riprova'],
            en: ['Sorry the service is not available because you are experiencing limited or no connection. Please try again later.'],
            pt: ['O serviço não está disponível devido a restrição ou sem ligação. Tenta, por favor, mais tarde.'],
            de: ['Sorry, der Service ist aufgrund einer eingeschränkten oder fehlenden Verbindung zur Zeit nicht erreichbar. Bitte versuche es zu einem späteren zeitpunkt erneut.'],
            fr: ['Désolé le service n\'est pas disponible car vous avez des problèmes de connexion. Veuillez réessayer dans quelques instants'],
            es: ['Estamos intentando tramitar tu operación. Puede que tarde un poco debido a la conexión.']
	},
        STR_NO_CONNECTION_RETRY: {
            it: ['Riprova'],
            en: ['Retry'],
            es: ['Prueba'],
            de: ['Beweis'],
            pt: ['Prova'],
            fr: ['Preuve']
        }
    }
};


CONFIGS.getText = function (str){
    var lang = navigator.language.split("-");
    var current_lang = (lang[0]);
    return CONFIGS.dictionary[str][current_lang];
}
