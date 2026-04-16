import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import cx from 'classnames';
import { FILE_TYPE_MAP, IMAGE_EXTENSIONS } from '../../const/uploader';
import Icon from '../Icon';
import Typography from '../Typography';
import InputHelper from './InputHelper';
import InputLabel from './InputLabel';
const toUploaderItems = (value) => {
    if (!value)
        return [];
    const values = Array.isArray(value) ? value : [value];
    return values.filter((item) => item instanceof File ||
        (typeof item === 'string' && item.trim().length > 0));
};
const toUploaderValue = (items, multiple) => {
    const nextItems = multiple ? items : items.slice(0, 1);
    return multiple ? nextItems : (nextItems[0] ?? null);
};
const isFileAccepted = (file, accept) => {
    if (!accept?.trim())
        return true;
    const acceptedTypes = accept
        .split(',')
        .map((type) => type.trim().toLowerCase())
        .filter(Boolean);
    if (acceptedTypes.length === 0)
        return true;
    const mimeType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    return acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
            return fileName.endsWith(type);
        }
        if (type.endsWith('/*')) {
            return mimeType.startsWith(type.replace('*', ''));
        }
        return mimeType === type;
    });
};
const getFileExtension = (name) => {
    const cleanName = name.split('?')[0].split('#')[0];
    const ext = cleanName.split('.').pop();
    return ext ? ext.toLowerCase() : '';
};
const getUrlFileName = (url) => {
    try {
        const parsed = new URL(url);
        const segments = parsed.pathname.split('/').filter(Boolean);
        const pathName = segments[segments.length - 1];
        return decodeURIComponent(pathName || url);
    }
    catch {
        const parts = url.split('/').filter(Boolean);
        const fallback = parts[parts.length - 1];
        return decodeURIComponent(fallback || url);
    }
};
const isImageSource = (source, extension) => {
    return source.startsWith('data:image/') || IMAGE_EXTENSIONS.has(extension);
};
const getPreviewConfig = (extension) => {
    if (FILE_TYPE_MAP[extension]) {
        return FILE_TYPE_MAP[extension];
    }
    const label = extension ? extension.slice(0, 4).toUpperCase() : 'FILE';
    return {
        label,
        color: '#9CA3AF',
        accent: '#4B5563',
    };
};
const formatFileSize = (size) => {
    if (size < 1024)
        return `${size} B`;
    if (size < 1024 * 1024)
        return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};
const Uploader = ({ id, name, value: valueProp, defaultValue, initialValue = null, label, labelPosition = 'top', autoHideLabel = false, onChange, className, helperText, disabled: disabledProp = false, size = 'default', fullWidth, inputRef, error: errorProp, success: successProp, loading = false, clearable = false, multiple = false, accept, width, required, ...props }) => {
    const parentRef = React.useRef(null);
    const elementRef = React.useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(toUploaderItems(defaultValue ?? initialValue));
    const isControlled = valueProp !== undefined;
    const selectedItems = React.useMemo(() => {
        const currentItems = toUploaderItems(isControlled ? valueProp : internalValue);
        return multiple ? currentItems : currentItems.slice(0, 1);
    }, [internalValue, isControlled, multiple, valueProp]);
    const value = React.useMemo(() => toUploaderValue(selectedItems, multiple), [multiple, selectedItems]);
    const helperMessage = errorProp && typeof errorProp === 'string' ? errorProp : helperText;
    const isError = !!errorProp;
    const disabled = loading || disabledProp;
    const updateValue = React.useCallback((items) => {
        const nextValue = toUploaderValue(items, multiple ?? false);
        onChange?.(nextValue);
        if (!isControlled) {
            setInternalValue(toUploaderItems(nextValue));
        }
    }, [isControlled, multiple, onChange]);
    const handleFiles = React.useCallback((files) => {
        const acceptedFiles = files.filter((file) => isFileAccepted(file, accept));
        if (acceptedFiles.length === 0) {
            return;
        }
        const nextItems = multiple
            ? [...selectedItems, ...acceptedFiles]
            : acceptedFiles;
        updateValue(nextItems);
    }, [accept, multiple, selectedItems, updateValue]);
    React.useImperativeHandle(inputRef, () => ({
        element: elementRef.current,
        value,
        focus: () => elementRef.current?.focus(),
        reset: () => {
            if (elementRef.current) {
                elementRef.current.value = '';
            }
            if (!isControlled) {
                const initialItems = toUploaderItems(initialValue);
                setInternalValue(multiple ? initialItems : initialItems.slice(0, 1));
            }
        },
        disabled,
    }));
    const handleFocus = (event) => {
        if (disabled)
            return;
        setFocused(true);
        props.onFocus?.(event);
    };
    const handleBlur = (event) => {
        const relatedTarget = event.relatedTarget;
        const uploaderContainsTarget = parentRef.current?.contains(relatedTarget);
        if (uploaderContainsTarget) {
            return;
        }
        setFocused(false);
        props.onBlur?.(event);
    };
    const handleChange = (event) => {
        const files = Array.from(event.target.files ?? []);
        handleFiles(files);
        event.target.value = '';
    };
    const handleDrop = (event) => {
        if (disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        handleFiles(Array.from(event.dataTransfer.files ?? []));
    };
    const handleDragOver = (event) => {
        if (disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        setDragging(true);
    };
    const handleDragLeave = (event) => {
        if (disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        const relatedTarget = event.relatedTarget;
        if (relatedTarget instanceof Node &&
            event.currentTarget.contains(relatedTarget)) {
            return;
        }
        setDragging(false);
    };
    const openFileDialog = () => {
        if (disabled)
            return;
        elementRef.current?.focus();
        elementRef.current?.click();
    };
    const handleRemoveFile = (index) => (event) => {
        event.stopPropagation();
        updateValue(selectedItems.filter((_, fileIndex) => fileIndex !== index));
    };
    const handleClearFiles = (event) => {
        event.stopPropagation();
        updateValue([]);
    };
    const previewFiles = React.useMemo(() => selectedItems.map((item, index) => {
        if (item instanceof File) {
            const extension = getFileExtension(item.name);
            const isImage = item.type.startsWith('image/') || IMAGE_EXTENSIONS.has(extension);
            return {
                key: `${item.name}-${item.lastModified}-${index}`,
                name: item.name,
                sizeLabel: formatFileSize(item.size),
                imageUrl: isImage ? URL.createObjectURL(item) : undefined,
                preview: isImage ? undefined : getPreviewConfig(extension),
                createdObjectUrl: isImage,
            };
        }
        const nameFromUrl = getUrlFileName(item);
        const extension = getFileExtension(nameFromUrl);
        const isImage = isImageSource(item, extension);
        return {
            key: `${nameFromUrl}-${index}`,
            name: nameFromUrl,
            sizeLabel: 'URL file',
            imageUrl: isImage ? item : undefined,
            preview: isImage ? undefined : getPreviewConfig(extension),
            createdObjectUrl: false,
        };
    }), [selectedItems]);
    React.useEffect(() => {
        return () => {
            for (const { imageUrl, createdObjectUrl } of previewFiles) {
                if (imageUrl && createdObjectUrl) {
                    URL.revokeObjectURL(imageUrl);
                }
            }
        };
    }, [previewFiles]);
    const inputId = `uploader-${id || name || 'input'}-${React.useId()}`;
    return (_jsxs("div", { id: id, className: cx('relative', {
            'w-full': fullWidth,
            'flex items-center gap-4': labelPosition === 'left',
        }, className), children: [((autoHideLabel && focused) || !autoHideLabel) && label && (_jsx(InputLabel, { id: inputId, size: size, required: required, children: label })), _jsxs("div", { role: "button", "aria-label": "Upload file drop zone", tabIndex: 0, className: cx('relative border rounded-md flex flex-col items-center', {
                    'w-full': fullWidth,
                    'border-danger-main dark:border-danger-main-dark focus:ring-danger-focus dark:focus:ring-danger-focus-dark': isError,
                    'border-success-main dark:border-success-main-dark focus:ring-success-focus dark:focus:ring-success-focus-dark': !isError && successProp,
                    'border-neutral-50 dark:border-neutral-50-dark hover:border-primary-hover dark:hover:border-primary-hover-dark focus:ring-primary-main dark:focus:ring-primary-main-dark': !isError && !successProp && !disabled,
                    'bg-neutral-20 dark:bg-neutral-30-dark cursor-not-allowed text-neutral-60 dark:text-neutral-60-dark': disabled,
                    'bg-neutral-10 dark:bg-neutral-10-dark shadow-box-3 focus:ring-3 focus:ring-primary-focus focus:!border-primary-main': !disabled,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark !border-primary-main dark:!border-primary-main-dark': focused,
                    'ring-3 ring-primary-focus dark:ring-primary-focus-dark border-primary-main dark:border-primary-main-dark': dragging,
                }), style: { width }, ref: parentRef, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, children: [_jsx("input", { ...props, id: inputId, name: name, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, disabled: disabled, "aria-label": label, ref: elementRef, type: "file", multiple: multiple, accept: accept, tabIndex: -1, style: {
                            position: 'absolute',
                            width: 1,
                            height: 1,
                            padding: 0,
                            margin: -1,
                            overflow: 'hidden',
                            clip: 'rect(0, 0, 0, 0)',
                            whiteSpace: 'nowrap',
                            border: 0,
                        } }), (multiple || previewFiles.length === 0) && (_jsxs("div", { className: cx('w-full p-6 flex flex-col items-center gap-3 text-center', {
                            'cursor-not-allowed': disabled,
                            'border-b border-neutral-30 dark:border-neutral-40-dark': previewFiles.length > 0,
                        }), children: [_jsx("div", { className: "h-10 w-10 flex items-center justify-center bg-neutral-15 rounded-full text-neutral-90 dark:text-neutral-90-dark", children: _jsx(Icon, { name: "cloud-arrow-up", strokeWidth: 1.5, size: 20 }) }), _jsx("button", { type: "button", onClick: (event) => {
                                    event.stopPropagation();
                                    openFileDialog();
                                }, disabled: disabled, "aria-label": "Open upload dialog", className: "absolute top-0 right-0 bottom-0 left-0" }), _jsxs(Typography, { variant: "paragraph-s", className: "text-neutral-70 dark:text-neutral-70-dark", children: [_jsx("span", { className: "text-primary-main dark:text-primary-main-dark", children: "Click to upload" }), ' ', "or drag and drop file", multiple ? 's' : '', " here"] })] })), previewFiles.length > 0 && (_jsxs("div", { className: "w-full", children: [previewFiles.map(({ key, name: fileName, sizeLabel, imageUrl, preview }, index) => (_jsxs("div", { className: cx('relative flex flex-col items-center gap-3 rounded-md text-neutral-90 dark:text-neutral-90-dark px-6 border-b border-neutral-30 dark:border-neutral-40-dark last:border-none', {
                                    'py-3': multiple,
                                    'py-7': !multiple,
                                }), children: [imageUrl && (_jsx("img", { src: imageUrl, alt: fileName, className: "w-8 h-8 rounded object-cover" })), preview && (_jsx("div", { className: "relative w-8 h-8", children: _jsxs("div", { style: {
                                                clipPath: 'polygon(0% 0%, 65% 0%, 100% 25%, 100% 100%, 0 100%)',
                                                backgroundColor: preview.color,
                                            }, className: "relative w-full h-full rounded flex items-center justify-center overflow-hidden text-12px font-semibold text-neutral-10", children: [preview.label, _jsx("div", { className: "absolute top-0 right-0 w-full h-full", style: {
                                                        clipPath: 'polygon(65% 0, 65% 25%, 100% 25%)',
                                                        backgroundColor: preview.accent,
                                                    } })] }) })), _jsx(Typography, { variant: "paragraph-xs", className: "truncate max-w-full", children: `${fileName} - ${sizeLabel}` }), !disabled && (_jsx("button", { onClick: handleRemoveFile(index), "aria-label": `Remove ${fileName}`, type: "button", className: "absolute top-3 right-3 h-8 w-8 flex items-center justify-center", children: _jsx(Icon, { name: "trash", size: 20 }) }))] }, key))), clearable && previewFiles.length > 1 && (_jsx("div", { className: "pt-2 flex justify-end", children: _jsx("button", { type: "button", onClick: handleClearFiles, disabled: disabled, className: "text-12px font-medium text-primary-main dark:text-primary-main-dark hover:text-primary-hover dark:hover:text-primary-hover-dark", children: "Clear all files" }) }))] }))] }), _jsx(InputHelper, { message: helperMessage, error: isError, size: size })] }));
};
Uploader.isFormInput = true;
export default Uploader;
