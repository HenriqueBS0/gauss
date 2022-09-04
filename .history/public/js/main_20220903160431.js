class Main {

    static campos;
    static botoes;
    static tabelaEntrada;

    static onLoad() {
        this.mapearElementos();
        this.setEventos();
    }

    static mapearElementos() {
        this.campos = { 
            incognitas: $('#incognitas')
        };

        this.botoes = {
            montarEntrada : $('#montar-entrada'),
            calcular      : $('#calcular')
        };

        this.tabelaEntrada = $('#tabela-entrada');
    }

    static setEventos() {
        this.setEventoMontarEntrada();
    }

    static setEventoMontarEntrada() {
        this.botoes.montarEntrada.click(this.onEventoMontarEntrada.bind(this));
    }

    static onEventoMontarEntrada() {
        const incognitas = this.campos.incognitas.val();

        if(!incognitas) {
            this.botoes.calcular.addClass('d-none');
            return;
        }

        this.botoes.calcular.removeClass('d-none');
        
        this.montarEntrada(incognitas);

    }

    static montarEntrada(incognitas) {
        this.tabelaEntrada.empty();

        this.tabelaEntrada.append(this.getCabecalho(incognitas));

        for (let index = 1; index <= incognitas; index++) {
            this.tabelaEntrada.append(this.getLinha(incognitas));
        }
    }

    static getCabecalho(incognitas) {

        const thead = $('<thead>');

        for (let index = 1; index <= incognitas; index++) {
            thead.append($('<th>', {class: 'text-center', text: `X${index}`}));
        }

        thead.append($('<th>', {text: 'Y', class: 'text-center'}));

        return thead;
    }

    static getLinha(incognitas) {
        const linha = $('<tr>');

        const dados = {};

        for (let index = 1; index <= incognitas; index++) {
            dados[`X${index}`] = null;
            linha.append($('<td>', {class: 'text-center'}).append(this.getInput(linha, `X${index}`)));
        }

        dados[`Y`] = null;
        linha.append($('<td>', {class: 'text-center'}).append(this.getInput(linha, 'Y')))

        return linha.prop('dados', dados);
    }

    static getInput(linha, atributo) {
        return $('<input>', {
            type: 'number', 
            class: 'form-control',
            blur: oEvento => this.onChangeInput($(oEvento.target), linha, atributo),
            change: oEvento => this.onChangeInput($(oEvento.target), linha, atributo),
        }); 
    }

    static onChangeInput(input, linha, atributo) {
        let dados = linha.prop('dados');
        dados[atributo] = input.val();
        linha.prop('dados');
    }
    
}