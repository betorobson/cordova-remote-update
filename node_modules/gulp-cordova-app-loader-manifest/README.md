gulp-cordova-app-loader-manifest
================================

Gulp plugin to create cordova-app-loader manifests.
This plugin is fork from [alexbeyn/gulp-cordova-app-loader-manifest](https://github.com/alexbeyn/gulp-cordova-app-loader-manifest), so all kudos go for him.
There are minor changes in the manifest generation (mostly to fit the structure of my in my current projects easier).

## Usage

```javascript
var calManifest = require('gulp-cordova-app-loader-manifest');

gulp.task('manifest', function() {
  return gulp.src('./www/**')
    .pipe(calManifest(options))
    .pipe(gulp.dest('./'));
});
```

## Options

#### load
```javascript
options.load = [
  'lib/your-app.js',
  'css/your-css.css'
];
```

#### root
```javascript
options.root = './';
```
Specifies the manifest.root option.

#### prefixSplit
```javascript
options.prefixSplit = '/'
```
Specifies prefix to split the _options.load_ filenames (default value is '/').

This means `options.prefixSplit = 'www/` for the `['www/lib/app.js', 'www/css/style.css']` will produce the following output:
```javasript
manifest.load = [
  'lib/app.js',
  'css/style.css'
]
```