import axios from 'axios';
import { ref } from 'vue';

type ConversionMethod = 'htmlToMarkdown' | 'markdownToHtml' | string;

interface ConversionConfig {
    endpoint: string;
    inputKey: string;
    outputKey: string;
}

export function useConverter() {
    const conversionLoading = ref(false);
    const conversionError = ref<string | null>(null);

    const conversionConfigs: Record<ConversionMethod, ConversionConfig> = {
        htmlToMarkdown: {
            endpoint: '/api/convert/html-to-markdown',
            inputKey: 'html',
            outputKey: 'markdown',
        },
        markdownToHtml: {
            endpoint: '/api/convert/markdown-to-html',
            inputKey: 'markdown',
            outputKey: 'html',
        },
    };

    const convert = async (input: string, method: ConversionMethod) => {
        conversionLoading.value = true;
        conversionError.value = null;

        try {
            const config = conversionConfigs[method];

            if (!config) {
                throw new Error(`Unsupported conversion method: ${method}`);
            }

            const response = await axios.post(config.endpoint, {
                [config.inputKey]: input,
            });

            return response.data[config.outputKey];
        } catch (error) {
            conversionError.value = error instanceof Error ? error.message : 'Unexpected error occurred during conversion';

            return null;
        } finally {
            conversionLoading.value = false;
        }
    };

    const htmlToMarkdown = (html: string) => convert(html, 'htmlToMarkdown');
    const markdownToHtml = (markdown: string) => convert(markdown, 'markdownToHtml');

    return {
        convert,
        htmlToMarkdown,
        markdownToHtml,
        conversionLoading,
        conversionError,
    };
}
