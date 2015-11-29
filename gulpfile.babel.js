import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import bump from 'gulp-bump';

const SRC = 'src';
const SPECS = 'specs';
const DIST = 'dist';
const PATHS = [
  `${SPECS}/*.spec.js`,
  `${SPECS}/**/*.spec.js`
];

gulp.task('copyStatics', () => gulp
  .src('./src/index.html')
  .pipe(gulp.dest('./dist/'))
);

gulp.task('bdd', () => gulp
  .src(PATHS)
  .pipe(mocha({ reporter: 'nyan'}))
  .pipe(mocha({ reporter: 'mocha-junit-reporter'}))
);

gulp.task('lint', () => gulp
  .src(PATHS)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError())
);

gulp.task('version', () => gulp
  .src('./package.json')
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'))
);

gulp.task('test', ['lint', 'bdd']);
gulp.task('production', ['test', 'copyStatics']);
gulp.task('release', ['production', 'version']);
gulp.task('default', ['test']);
