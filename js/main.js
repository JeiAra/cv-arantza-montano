/* ============================================================
   CV INTERACTIVO - ARANTZA JEIMY MONTAÑO MALLEA
   1. Modo oscuro/claro con persistencia (localStorage)
   2. Resaltado automático de página activa
   3. Validación de formulario de contacto
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================
    // 1. MODO OSCURO / CLARO
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const htmlElement = document.documentElement;
    const THEME_KEY = 'arantza_cv_theme';

    function applyTheme(theme) {
        if (theme === 'light') {
            htmlElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Modo Claro';
        } else {
            htmlElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Modo Oscuro';
        }
    }

    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = htmlElement.getAttribute('data-theme') === 'light';
            const newTheme = isLight ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
        });
    }

    // ============================================
    // 2. RESALTADO AUTOMÁTICO DE PÁGINA ACTIVA
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // ============================================
    // 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ============================================
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
        nombre: {
            input: document.getElementById('nombre'),
            error: document.getElementById('error-nombre'),
            validate: (v) => v.trim().length >= 3 ? '' : 'El nombre debe tener al menos 3 caracteres.'
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('error-email'),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Ingresa un correo electrónico válido.'
        },
        asunto: {
            input: document.getElementById('asunto'),
            error: document.getElementById('error-asunto'),
            validate: (v) => v.trim().length >= 3 ? '' : 'El asunto debe tener al menos 3 caracteres.'
        },
        mensaje: {
            input: document.getElementById('mensaje'),
            error: document.getElementById('error-mensaje'),
            validate: (v) => v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.'
        }
    };

    function validateField(field) {
        const value = field.input.value;
        const errorMsg = field.validate(value);
        field.error.textContent = errorMsg;
        field.input.setAttribute('aria-invalid', errorMsg ? 'true' : 'false');
        return !errorMsg;
    }

    Object.values(fields).forEach(field => {
        field.input.addEventListener('blur', () => validateField(field));
        field.input.addEventListener('input', () => {
            if (field.error.textContent) validateField(field);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;

        Object.values(fields).forEach(field => {
            if (!validateField(field)) allValid = false;
        });

        if (allValid) {
            const successMsg = document.getElementById('form-success');
            successMsg.hidden = false;
            form.reset();
            Object.values(fields).forEach(field => {
                field.error.textContent = '';
                field.input.removeAttribute('aria-invalid');
            });
            setTimeout(() => { successMsg.hidden = true; }, 5000);
        } else {
            const firstError = Object.values(fields).find(f => f.error.textContent);
            if (firstError) firstError.input.focus();
        }
    });

    form.addEventListener('reset', () => {
        Object.values(fields).forEach(field => {
            field.error.textContent = '';
            field.input.removeAttribute('aria-invalid');
        });
        document.getElementById('form-success').hidden = true;
    });
});