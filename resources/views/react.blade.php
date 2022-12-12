<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <title>Cassanovas Distributors</title>
    <!-- Styles -->
    <!-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> -->
<link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap-slider.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/fontawesome-all.min.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/slick.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}">
<link rel="stylesheet" type="text/css" href="{{ asset('css/custom.css') }}">
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"> -->
</head>
<body>
    <!-- React root DOM -->
<div id="root"></div>
    <!-- React JS -->
<script src="{{ asset('js/app.js') }}" defer></script>
<script src="{{ asset('js/hostify/jquery.min.js') }}"></script>
<script src="{{ asset('js/hostify/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/hostify/bootstrap-slider.min.js') }}"></script>
<script src="{{ asset('js/hostify/slick.js') }}"></script>
<script src="{{ asset('js/hostify/main.js') }}"></script>

<!-- <script src="https://js.paystack.co/v1/inline.js"></script>  -->
</body>
</html>