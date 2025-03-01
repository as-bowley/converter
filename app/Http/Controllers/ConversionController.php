<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ConverterService;

class ConversionController extends Controller
{
    protected $converterService;

    public function __construct(ConverterService $converterService)
    {
        $this->converterService = $converterService;
    }

    public function markdownToHtml(Request $request)
    {
        $request->validate([
            'markdown' => 'required|string'
        ]);

        $converted = $this->converterService->markdownToHtml($request->input('markdown'));

        return response()->json([
            'html' => $converted
        ]);
    }

    public function htmlToMarkdown(Request $request)
    {
        $request->validate([
            'html' => 'required|string'
        ]);

        $converted = $this->converterService->htmlToMarkdown($request->input('html'));

        return response()->json([
            'markdown' => $converted
        ]);
    }
}
