@extends('layouts.map')

@section('top-nav-bar')
    @parent
@endsection

@section('css')
    @parent
    <link rel="stylesheet" href="{{ asset('css/index.css') }}" crossorigin="anonymous">
@endsection

@section('content')
    <div class="row p-6">
        <div class="col-12">
            <div class="page-title">
                <h1>{!! __('messages.geo-map-assignment') !!}</h1>
            </div>

            <div id="map"></div>

            <div class="row">
                <div class="col-12">
                    <button type="button" id="get-json" class="btn btn-sm btn-secondary">{!! __('messages.upload-json-file') !!}</button>
                </div>
                <div class="col-12">
                    <button type="button" id="lassoo" class="btn btn-sm btn-secondary">{!! __('messages.lassoo') !!}</button>
                </div>
                <div class="col-12">
                    <button type="button" id="change-color" class="btn btn-sm btn-secondary">{!! __('messages.change-icon-color') !!}</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('footer-nav')
    @parent
@endsection

@section('js')
    @parent()

    {{-- LOAD CUSTOM MAP HANDLER --}}
    <script src="{{ asset('js/map-handler.js') }}"></script>

    {{-- LOAD GOOGLE MAPS API; Dependency: API KEY, Calls: function initMap() --}}
    <script async defer
            src="https://maps.googleapis.com/maps/api/js?key={{$googleMapsApiKey}}&callback=initMap">
    </script>
@endsection
