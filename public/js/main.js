class Main {

    static campos;
    static botoes;
    static tabelaEntrada;
    static tabelaSaida;
    static alerta;

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
        this.tabelaSaida   = $('#tabela-saida');

        this.alerta = $('#alerta');
    }

    static setEventos() {
        this.setEventoMontarEntrada();
        this.setOnClickCalcular();
    }

    static setOnClickCalcular() {
        this.botoes.calcular.click(this.onClickCalcular.bind(this));
    }

    static setEventoMontarEntrada() {
        this.botoes.montarEntrada.click(this.onEventoMontarEntrada.bind(this));
    }

    static onEventoMontarEntrada() {
        this.tabelaEntrada.empty();
        this.tabelaSaida.empty();
        this.alerta.addClass('d-none');

        const incognitas = this.campos.incognitas.val();

        if(!incognitas) {
            this.botoes.calcular.addClass('d-none');
            return;
        }

        this.botoes.calcular.removeClass('d-none');
        
        this.montarEntrada(incognitas);

    }

    static montarEntrada(incognitas) {

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

    static onClickCalcular() {
        this.tabelaSaida.empty();
        this.alerta.addClass('d-none');
        this.tabelaEntrada.find('input').removeClass('is-invalid');

        const dados = [];
        let temValorNaoInformado = false;

        this.tabelaEntrada.find('tr').each(function() {
            const linha = $(this);

            linha.find('input').each(function() {
                const input = $(this);
                if(!input.val()) {
                    input.addClass('is-invalid');
                    temValorNaoInformado = true;
                }
            });

            const matriz = [];

            for(const atributo in linha.prop('dados')) {
                matriz.push(linha.prop('dados')[atributo]);
            }

            dados.push(matriz);
        });

        if(temValorNaoInformado) {
            this.alerta.removeClass('d-none');
            return;
        }

        const resolucao = this.calcular(dados);

        const cabecalhoSaida = $('<thead>');
        const linhaRespostas = $('<tr>');

        for (let coificiente = 1; coificiente <= dados.length; coificiente++) {
            cabecalhoSaida.append($('<th>', {text: `X${coificiente}`}));
            linhaRespostas.append($('<td>', {text: resolucao[`X${coificiente}`]}));
        }

        this.tabelaSaida.append(cabecalhoSaida, linhaRespostas);
    }

    static calcular(dados) {
        dados = this.eliminacao(dados);

        const resolucao = {};

        const posicaoUltimaLinha = dados.length - 1; 
        const posicaoY = dados[posicaoUltimaLinha].length - 1;

        resolucao[`X${posicaoUltimaLinha+1}`] = dados[posicaoUltimaLinha][posicaoY] / dados[posicaoUltimaLinha][posicaoUltimaLinha];

        for (let linha = posicaoUltimaLinha - 1; linha <= 0; linha++) {
            let soma = 0;
            for (let coluna = linha+1; coluna < posicaoY; coluna++) {
                soma+=dados[linha][coluna] * resolucao[`X${linha+2}`];
            }
            resolucao[`X${linha+1}`] = (dados[linha][posicaoY] - soma)/dados[linha][linha];
        }

        return resolucao;
    }

    static eliminacao(dados) {
        const dimencao = dados.length;

        for (let indicePivo = 0; indicePivo < (dimencao - 1); indicePivo++) {
            for (let linha = indicePivo+1; linha < dimencao; linha++) {
                const m = dados[linha][indicePivo] / dados[indicePivo][indicePivo];
                dados[linha][indicePivo] = 0;

                for (let coluna = indicePivo+1; coluna < dimencao; coluna++) {
                    dados[linha][coluna] = dados[linha][coluna] - m * dados[indicePivo][coluna];
                }

                const posicaoY = dados[linha].length - 1;

                dados[linha][posicaoY] = dados[linha][posicaoY] - m * dados[indicePivo][posicaoY]; 
            }
        }

        return dados;
    }
    
}