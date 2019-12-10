<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{!! __('messages.geo-map') !!}</title>
    <meta name="description" content="{{ __('messages.default-description') }}">
    <meta name="keywords" content="{{ __('messages.default-keywords') }}">
    <meta name="author" content="{{ __('messages.default-author') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    @section('css')
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" crossorigin="anonymous">
        @show()
</head>
<body>
    {{-- PAGE --}}
    <div class="container page">
        {{-- CONTENT --}}
        <div class="content">
            @yield('content')
        </div>
    </div>

    {{-- MODALS --}}
    @include('inc.modals.geo.general')

    {{-- JS --}}
    @section('js')
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.1/css/tempusdominus-bootstrap-4.min.css" />
        @show()
</body>
</html>