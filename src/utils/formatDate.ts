type LocaleOptions = {
  locale: string; // Kullanıcı için locale bilgisi
};

export const formatDate = (dateString: string, { locale }: LocaleOptions) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long', // Ayın tam ismini gösterir
      year: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Invalid date:', error);
    return 'Invalid date';
  }
};
