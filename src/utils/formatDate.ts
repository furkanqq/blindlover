type LocaleOptions = {
  locale: string; // Kullanıcı için locale bilgisi
};

export const formatDate = (dateString: string | undefined, { locale }: LocaleOptions) => {
  try {
    if (!dateString) return;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid date string');

    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Invalid date:', error);
    return 'Invalid date';
  }
};
