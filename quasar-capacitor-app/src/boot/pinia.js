import { createPinia } from 'pinia';

export default async ({ app }) => {
  const pinia = createPinia();
  app.use(pinia);
};
