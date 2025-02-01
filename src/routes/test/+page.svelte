<script lang="ts">
import ImageUploader from "$lib/image-uploader/image-uploader.svelte";
let files = $state(null as FileList | null);
// Фейковая функция обратного вызова для имитации отправки файлов.
async function fakeOnUpload(filesArray: File[]): Promise<void> {
    console.log("Fake uploading files:", filesArray);
    // Симулируем асинхронную операцию (например, задержку 1 секунда).
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Fake upload complete.");
  }

// Обработчик отправки формы.
function handleSubmit(event: Event) {
    // Отменяем стандартное поведение формы.
    event.preventDefault();
    console.log("Submitted files (from bind):", files);
    if (files) {
      // Выводим информацию по каждому файлу.
      for (let i = 0; i < files.length; i++) {
        console.log(`File ${i + 1}:`, files[i]);
      }
    } else {
      console.log("No files submitted.");
    }
  }
</script>

<div class="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex items-center justify-center">
<div class="container max-w-lg mx-auto px-4 py-16">
  <h1 class="text-2xl md:text-3xl font-bold text-center mb-8">Test component page</h1>

  <!-- Flex-контейнер для скелетонов -->
  <div class="flex items-center space-x-4">
    <form onsubmit={handleSubmit}>
        <!-- Используем компонент и привязываем bind:files для двусторонней синхронизации -->
        <ImageUploader bind:files={files} onUpload={fakeOnUpload} />

        
        <!-- Кнопка для отправки формы -->
        <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Отправить
        </button>
      </form>
  </div>
</div>
</div>

  
  

   
  
  
  
  
  










