<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gauss</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
</head>

<body>
    <h1 class="text-center">Gauss</h1>
    <div class="container">
        <div>
            <div class="mb-3">
                <label for="incognitas" class="form-label">Incógnitas</label>
                <input type="number" class="form-control" id="incognitas" aria-describedby="emailHelp">
            </div>
            <div class="d-grid">
                <button type="button" id="montar-entrada" class="btn btn-primary btn-lg">Montar Entrada</button>
            </div>
        </div>

        <table id="tabela-entrada" class="table mt-5"></table>
        <div class="d-grid">
            <button type="button" id="calcular" class="btn btn-primary btn-lg d-none">Calcular</button>
        </div>
        <div id='alerta' class="mt-3 alert alert-danger d-none" role="alert">Campos não preenchidos!</div>
        <table id="tabela-saida" class="table mt-5"></table>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
</body>
<script src="../public/js/jquery.js"></script>
<script src="../public/js/main.js"></script>
<script>$(() => Main.onLoad())</script>
</html>