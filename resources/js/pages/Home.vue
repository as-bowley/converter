<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import { ref } from 'vue';

const conversionMode = ref('html');
const result = ref('Result will appear here');
const htmlContent = ref('<h1>Hello World</h1>');
const markdownContent = ref('# Hello World');

const convertHtmlToMarkdown = async (html: string) => {
    try {
        const response = await axios.post('/api/convert/html-to-markdown', {
            html: html,
        });
        return response.data.markdown;
    } catch (error) {
        console.error('Conversion error:', error);
        return 'Error converting HTML to Markdown';
    }
};

const convertMarkdownToHtml = async (markdown: string) => {
    try {
        const response = await axios.post('/api/convert/markdown-to-html', {
            markdown: markdown,
        });
        return response.data.html;
    } catch (error) {
        console.error('Conversion error:', error);
        return 'Error converting Markdown to HTML';
    }
};

const handleConversion = async () => {
    if (conversionMode.value === 'html') {
        result.value = await convertHtmlToMarkdown(htmlContent.value);
    } else {
        result.value = await convertMarkdownToHtml(markdownContent.value);
    }
};
</script>

<template>
    <Head title="Home">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8">
        <header class="not-has-[nav]:hidden mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
            <nav class="flex items-center justify-end gap-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="route('dashboard')"
                    class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                >
                    Dashboard
                </Link>
                <template v-else>
                    <Link
                        :href="route('login')"
                        class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Log in
                    </Link>
                    <Link
                        :href="route('register')"
                        class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Register
                    </Link>
                </template>
            </nav>
        </header>
        <div class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main class="w-full max-w-[335px] overflow-hidden lg:max-w-4xl">
                <div class="mb-4 flex space-x-2">
                    <button
                        class="rounded-lg border px-4 py-2"
                        :class="conversionMode === 'html' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"
                        @click="conversionMode = 'html'"
                    >
                        HTML to Markdown
                    </button>
                    <button
                        class="rounded-lg border px-4 py-2"
                        :class="conversionMode === 'markdown' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"
                        @click="conversionMode = 'markdown'"
                    >
                        Markdown to HTML
                    </button>
                </div>

                <div class="grid h-[500px] grid-cols-2 gap-4">
                    <div class="flex h-full w-full flex-col rounded border">
                        <p class="bg-gray-100 p-2 text-sm font-medium">
                            {{ conversionMode === 'html' ? 'HTML Input' : 'Markdown Input' }}
                        </p>
                        <div class="flex-1">
                            <template v-if="true">
                                <CodeEditor v-if="conversionMode === 'html'" v-model="htmlContent" language="html" />
                                <CodeEditor v-else v-model="markdownContent" language="markdown" />
                            </template>
                        </div>
                    </div>

                    <div class="flex h-full w-full flex-col rounded border">
                        <p class="bg-gray-100 p-2 text-sm font-medium">
                            {{ conversionMode === 'html' ? 'Markdown Output' : 'HTML Output' }}
                        </p>
                        <div class="flex-1">
                            <template v-if="true">
                                <CodeEditor v-model="result" :language="conversionMode === 'html' ? 'markdown' : 'html'" :readonly="true" />
                            </template>
                        </div>
                    </div>
                </div>

                <button class="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" @click="handleConversion">Convert</button>
            </main>
        </div>
    </div>
</template>
