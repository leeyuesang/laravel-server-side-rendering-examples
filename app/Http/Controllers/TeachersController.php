<?php

namespace App\Http\Controllers;

class TeachersController extends Controller {

    public function __invoke()
    {
        return view('teachers', [
            'packages' => $this->getPackages(),//this varibale will be assigned to view
        ]);
    }

    private function getPackages() : array
    {
        $path = public_path('packages.json');

        $contents = file_get_contents($path);

        return json_decode($contents, true);
    }
}
