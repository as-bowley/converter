<?php

namespace App\Services;

use League\HTMLToMarkdown\HtmlConverter;
use League\CommonMark\CommonMarkConverter;

class ConverterService
{
    public function htmlToMarkdown(String $content): string
    {
        $converter = new HtmlConverter(array('strip_tags' => true));

        return $converter->convert($content);
    }

    public function markdownToHtml(String $content): string
    {
        $converter = new CommonMarkConverter();

        return $converter->convert($content);
    }
}
