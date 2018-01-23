<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel + Vue ssr example</title>
    </head>
    <body>
        {!! ssr('js/vue/entry.js')->enabled()

            // Share the packages with the server script through context
            ->withContext('packages', $packages)

            // If ssr fails, we need a container to render the app client-side
            ->withFallback('<div id="app"></div>')

            // We want to load the script tag before the html, with a `defer` tag
            ->loadScriptBefore()
            ->loadScriptDeferred() !!}
        <script>
            // Share the packages with the client script through a JS variable
            window.packages = @json($packages)
        </script>
    </body>
</html>