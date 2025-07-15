import {Colors} from './Colors';

export const getDecimalPart = (regular_price: any, sale_price: any) => {
  const actual: any = (((regular_price - sale_price) / regular_price) * 100)
    .toString()
    .split('.');

  return actual?.[1]?.[1]
    ? `${actual?.[0]}.${actual?.[1]?.[1]}`
    : `${actual?.[0]}`;
};

export const getProcessedHtml = (descriptionString: any) => {
  if (!descriptionString) {
    return '<p>No description available.</p>';
  }

  let html = descriptionString;
  html = html.replace(/\\n/g, '<br />');
  html = html.replace(/\n/g, '<br />');
  html = html.replace(/(<(ul|ol)(?: [^>]*)?>)\s*<br\s*\/?>/gi, '$1');
  html = html.replace(/<\/li>\s*<br\s*\/?>\s*(<li(?: [^>]*)?>)/gi, '</li>$1');
  html = html.replace(/<br\s*\/?>\s*(<\/(ul|ol)>)/gi, '$1');
  return html;
};

export const tagsStyles: any = {
  body: {
    whiteSpace: 'normal',
    color: Colors.lightBlack, // Updated text color as requested
    fontSize: 14,
  },
  p: {
    // This rule applies to all paragraphs, including those inside list items.
    // We remove default top margin and set a consistent bottom margin for spacing.
    marginTop: 0,
    marginBottom: 16,
    padding: 0,
    lineHeight: 22, // Improves readability
  },
  ul: {
    // The paragraph for "Product Details:" above the list will provide spacing,
    // so we can reset the list's own margins.
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20, // This provides indentation for the bullets
  },
  li: {
    marginBottom: 0,
    padding: 0,
  },
  strong: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.lightBlack, // Ensure bolded text is also dark
  },
  a: {
    color: Colors.primary,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
};
