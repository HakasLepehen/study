import Post from './post.js';
import * as $ from 'jquery';
import './styles/style.css'
import './styles/less.less'
import './styles/sass.scss'

const post = new Post('Webpack');

console.log(JSON.stringify(post));
$('pre')
.html(JSON.stringify(post))
.addClass('vendor');

console.log('Hi');
