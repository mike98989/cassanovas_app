<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <link href="{{ asset('images/logo_white.png')}}" rel="icon">
  <title>{{env('APP_NAME')}} Dashboard</title>
  <link href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
  <link href="{{ asset('css/ruang-admin.min.css') }}" rel="stylesheet">
  
</head>

<body id="page-top">
    <!-- React root DOM -->
    <div id="root"></div>
    <!-- React JS -->
<!-- Scroll to top -->
<a class="scroll-to-top rounded" href="#page-top">
  <i class="fas fa-angle-up"></i>
</a>
<script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('js/app.js') }}" defer></script>
<script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('vendor/jquery-easing/jquery.easing.min.js') }}"></script>
<!-- <script src="{{ asset('js/ruang-admin.min.js') }}"></script> -->
<script src="https://js.paystack.co/v1/inline.js"></script> 

<!-- <script src="{{ asset('vendor/chart.js/Chart.min.js') }}"></script> -->
<!-- <script src="{{ asset('js/demo/chart-area-demo.js') }}"></script>   -->
</body>

</html>