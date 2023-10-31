export const title = (value: string) => {
  switch (value) {
    case 'phone':
      return 'Mobile Phones';

    case 'tablet':
      return 'Tablets';

    case 'accessories':
      return 'Accessories';

    default:
      return 0;
  }
};
