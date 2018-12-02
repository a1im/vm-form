import vue from 'rollup-plugin-vue'; // Обработка однофайловых компонентов .vue
import buble from 'rollup-plugin-buble';
// Транспиляция/Полифилизация для умеренной поддержки браузеров
export default {
    input: 'src/index.js', // Путь до относительного package.json
    output: {
        name: 'VMForm',
        exports: 'named',
    },
    plugins: [
        vue({
            css: true, // Динамически внедряем CSS в тег <style>
            compileTemplate: true, // Явное преобразование шаблона в рендер-функцию
        }),
        buble(), // Транспиляция в ES5
    ],
};
