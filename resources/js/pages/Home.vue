<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import { useConverter } from '@/composables/useConverter';
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const input = ref('');
const output = ref('');

const { convert, conversionLoading, conversionError } = useConverter();

const conversionMethod = ref<string>('htmlToMarkdown');

const handleConversion = async () => {
    const result = await convert(input.value, conversionMethod.value);
    if (result) {
        output.value = result;
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
            <nav class="flex items-center justify-between gap-4">
                <div>
                    <h1 class="text-xl font-semibold">Converter</h1>
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
            <main class="w-full max-w-[335px] overflow-hidden lg:max-w-4xl">
                <div class="mb-4 flex space-x-2">
                    <button
                        class="rounded-lg border px-4 py-2"
                        :class="conversionMethod === 'htmlToMarkdown' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'"
                        @click="conversionMethod = 'htmlToMarkdown'"
                    >
                        HTML to Markdown
                    </button>
                    <button
                        class="rounded-lg border px-4 py-2"
                        :class="conversionMethod === 'markdownToHtml' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'"
                        @click="conversionMethod = 'markdownToHtml'"
                    >
                        Markdown to HTML
                    </button>
                </div>

                <div class="grid h-[500px] grid-cols-2 gap-4">
                    <div class="flex h-full w-full flex-col rounded border">
                        <p class="bg-gray-100 p-2 text-sm font-medium">
                            {{ conversionMethod === 'htmlToMarkdown' ? 'HTML Input' : 'Markdown Input' }}
                        </p>
                        <div class="flex-1">
                            <template v-if="true">
                                <CodeEditor v-if="conversionMethod === 'html'" v-model="input" language="html" />
                                <CodeEditor v-else v-model="input" language="markdown" />
                            </template>
                        </div>
                    </div>

                    <div class="flex h-full w-full flex-col rounded border">
                        <p class="bg-gray-100 p-2 text-sm font-medium">
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

                <button class="mt-4 w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700" @click="handleConversion">
                    {{ !conversionLoading ? 'Convert' : 'Loading...' }}
                </button>
            </main>
        </div>
    </div>
</template>
