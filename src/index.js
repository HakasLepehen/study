import Post from './post.js';
import * as $ from 'jquery';
import './styles/style.css'

const post = new Post('Webpack');

console.log(JSON.stringify(post));
$('pre')
.html(JSON.stringify(post) + '1')
.addClass('vendor');

console.log('Hi');
