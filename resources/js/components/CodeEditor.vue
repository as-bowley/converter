<template>
    <div class="h-full">
        <codemirror
            v-model="inputContent"
            :placeholder="placeholder"
            :style="{ height: '100%' }"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensionsValue"
            @ready="handleReady"
        />
    </div>
</template>

<script setup lang="ts">
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state'; // Import EditorState
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import { computed, ref, shallowRef, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: 'html',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const inputContent = ref(props.modelValue);

const view = shallowRef();

const handleReady = (payload) => {
    view.value = payload.view;
};

const extensionsValue = computed(() => {
    const extensions = [basicSetup, oneDark];

    if (props.language === 'html') {
        extensions.push(html());
    } else {
        extensions.push(markdown());
    }

    if (props.readonly) {
        extensions.push(EditorState.readOnly.of(true));
    }

    return extensions;
});

const placeholder = computed(() => {
    return props.language === 'html' ? 'Enter HTML here...' : 'Enter Markdown here...';
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== inputContent.value) {
            inputContent.value = newValue;
        }
    },
);

watch(inputContent, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>
