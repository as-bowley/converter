<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import { useConverter } from '@/composables/useConverter';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRightLeft, Code, FileText } from 'lucide-vue-next';
import { ref } from 'vue';

const input = ref('');
const output = ref('');

const { convert, conversionLoading, conversionError } = useConverter();

type ConversionMethod = 'htmlToMarkdown' | 'markdownToHtml';

const conversionMethod = ref<ConversionMethod>('htmlToMarkdown');

const handleConversion = async () => {
    const result = await convert(input.value, conversionMethod.value);
    if (result) {
        output.value = result;
    }
};

const handleTabSwitch = (method: ConversionMethod) => {
    input.value = '';
    output.value = '';
    conversionMethod.value = method;
};
</script>

<template>
    <Head title="Home">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8">
        <header class="not-has-[nav]:hidden mb-6 w-full max-w-[656px] text-sm lg:max-w-4xl">
            <nav class="flex items-center justify-between gap-4">
                <div>
                    <div class="flex items-center gap-2">
                        <ArrowRightLeft class="size-6 text-primary" /> <span class="text-xl font-semibold">Code Converter</span>
                    </div>
                </div>
                <div>
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
                </div>
            </nav>
        </header>
        <div class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main class="w-full max-w-[656px] overflow-hidden lg:max-w-4xl">
                <section class="py-16 md:py-24">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h1 class="mb-6 text-4xl font-bold md:text-6xl">
                                Convert Between <span class="text-primary">HTML</span> and <span class="text-primary">Markdown</span> Seamlessly
                            </h1>
                            <p class="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                                A powerful, free online tool that instantly converts your code between HTML and Markdown formats with perfect
                                accuracy.
                            </p>
                        </div>
                    </div>
                    <div class="rounded-lg border border-gray-200 shadow-sm">
                        <div class="flex space-x-2 bg-gray-100 p-4">
                            <button
                                class="flex items-center space-x-1 rounded-lg border px-4 py-2 font-semibold"
                                :class="conversionMethod === 'htmlToMarkdown' ? 'bg-primary text-white' : 'text-gray-800 hover:bg-gray-200'"
                                @click="handleTabSwitch('htmlToMarkdown')"
                            >
                                <Code class="mr-2 size-4" />
                                HTML to Markdown
                            </button>
                            <button
                                class="flex items-center space-x-1 rounded-lg border px-4 py-2 font-semibold"
                                :class="conversionMethod === 'markdownToHtml' ? 'bg-primary text-white' : 'text-gray-800 hover:bg-gray-200'"
                                @click="handleTabSwitch('markdownToHtml')"
                            >
                                <FileText class="mr-2 size-4" />
                                Markdown to HTML
                            </button>
                        </div>

                        <div class="grid h-[500px] gap-4 p-4 md:grid-cols-2">
                            <div class="flex h-full w-full flex-col">
                                <p class="pb-2 font-semibold">
                                    {{ conversionMethod === 'htmlToMarkdown' ? 'HTML Input' : 'Markdown Input' }}
                                </p>
                                <div class="flex-1">
                                    <template v-if="true">
                                        <CodeEditor v-if="conversionMethod === 'htmlToMarkdown'" v-model="input" language="html" />
                                        <CodeEditor v-else v-model="input" language="markdown" />
                                    </template>
                                </div>
                            </div>

                            <div class="flex h-full w-full flex-col">
                                <p class="pb-2 font-semibold">
                                    {{ conversionMethod === 'htmlToMarkdown' ? 'Markdown Output' : 'HTML Output' }}
                                </p>
                                <div class="flex-1">
                                    <template v-if="true">
                                        <CodeEditor
                                            v-model="output"
                                            :language="conversionMethod === 'htmlToMarkdown' ? 'markdown' : 'html'"
                                            :readonly="true"
                                        />
                                    </template>
                                </div>
                            </div>
                        </div>

                        <div v-if="conversionError" class="error">
                            {{ conversionError }}
                        </div>

                        <div class="p-4">
                            <button
                                class="mx-auto flex w-1/3 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-blue-700"
                                @click="handleConversion"
                            >
                                <ArrowRightLeft class="size-4" />
                                {{ !conversionLoading ? 'Convert' : 'Loading...' }}
                            </button>
                        </div>
                    </div>
                </section>
                <section class="container mx-auto px-4 py-16">
                    <div class="mx-auto max-w-4xl">
                        <h2 class="mb-8 text-3xl font-bold">How to Convert Between HTML and Markdown</h2>

                        <div class="space-y-8">
                            <div>
                                <h3 class="mb-3 text-xl font-semibold">What is HTML?</h3>
                                <p class="mb-4 text-muted-foreground">
                                    HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web
                                    browser. It defines the structure and content of web pages using various tags and attributes.
                                </p>
                                <div class="rounded-md bg-muted p-4 font-mono text-sm">
                                    {{ `
                                    <h1>This is a heading</h1>
                                    <p>This is a <strong>paragraph</strong> with <em>formatted</em> text.</p>
                                    `}}
                                </div>
                            </div>

                            <div>
                                <h3 class="mb-3 text-xl font-semibold">What is Markdown?</h3>
                                <p class="mb-4 text-muted-foreground">
                                    Markdown is a lightweight markup language with plain text formatting syntax. It's designed to be easy to write and
                                    read, and can be converted to HTML and many other formats. It's widely used for documentation, README files, and
                                    content creation.
                                </p>
                                <div class="rounded-md bg-muted p-4 font-mono text-sm">
                                    {{ `# This is a heading. This is a **paragraph** with *formatted* text.` }}
                                </div>
                            </div>

                            <div>
                                <h3 class="mb-3 text-xl font-semibold">Converting HTML to Markdown</h3>
                                <ol class="mb-4 list-inside list-decimal space-y-2 text-muted-foreground">
                                    <li>Paste your HTML code into the HTML input field on the left side of the converter.</li>
                                    <li>Click the "Convert HTML to Markdown" button.</li>
                                    <li>Your converted Markdown will appear in the output field on the right.</li>
                                    <li>Use the copy button to copy the result to your clipboard.</li>
                                </ol>
                                <p class="text-muted-foreground">
                                    This conversion is useful when you want to simplify complex HTML into a more readable format, or when migrating
                                    content from HTML-based systems to Markdown-based platforms.
                                </p>
                            </div>

                            <div>
                                <h3 class="mb-3 text-xl font-semibold">Converting Markdown to HTML</h3>
                                <ol class="mb-4 list-inside list-decimal space-y-2 text-muted-foreground">
                                    <li>Paste your Markdown text into the Markdown input field on the left side of the converter.</li>
                                    <li>Click the "Convert Markdown to HTML" button.</li>
                                    <li>Your converted HTML will appear in the output field on the right.</li>
                                    <li>Use the copy button to copy the result to your clipboard.</li>
                                </ol>
                                <p class="text-muted-foreground">
                                    This conversion is helpful when you need to use Markdown content in HTML-based systems, or when you want to apply
                                    more complex styling and functionality to your content.
                                </p>
                            </div>

                            <div>
                                <h3 class="mb-3 text-xl font-semibold">Common Use Cases</h3>
                                <ul class="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>Converting blog posts between different content management systems</li>
                                    <li>Preparing documentation for technical projects</li>
                                    <li>Simplifying complex HTML emails into more manageable Markdown</li>
                                    <li>Creating content that needs to be published in multiple formats</li>
                                    <li>Migrating content between different platforms and tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>
