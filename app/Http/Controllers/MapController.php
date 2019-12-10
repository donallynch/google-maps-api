<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Psr\SimpleCache\InvalidArgumentException;

/**
 * Class MapController
 * @package App\Http\Controllers
 */
class MapController
{
    /** @var string $apiKey */
    private $apiKey;

    /**
     * MapController constructor.
     * @param Request $request
     * @throws InvalidArgumentException
     */
    public function __construct(
        Request $request
    ){
        $this->apiKey = config('app.GOOGLE_MAPS_API_KEY');
    }

    /**
     * @return Factory|View
     */
    public function indexAction()
    {
        return view('geo.map.index', [
            'googleMapsApiKey' => $this->apiKey
        ]);
    }
}

