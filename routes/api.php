<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConversionController;

Route::post('convert/markdown-to-html',[ConversionController::class, 'markdownToHtml']);

Route::post('convert/html-to-markdown', [ConversionController::class, 'htmlToMarkdown']);
