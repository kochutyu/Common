export function unescapeDescription(description) {
  description = description || '';
  if (!/<\/(div|p)>/.test(description)) {
    description = description.replace(/[ &<>"']/g, m => {
      return {' ': ' ', '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#039;'}[m];
    });
    description = description.replace(/(^|\s|;)@(1|2)(\w{8})(.+?)@/g, (match, p1, p2, p3, p4) => {
      return p1 + '<a class="mention" data-type="' + (p2 === '1' ? 'user' : 'organization') + '"'
        + ' data-id="' + p3 + '">@' + p4.replace('+', ' ') + '</a>';
    });
    description = '<p>' + description.replace(/\n/g, '</p><p>') + '</p>';
  }
  return description;
}

export function escapeDescription(description) {
  description = description || '';
  description = description.replace(/<br.*?>/g, '\n');
  description = description.replace(/<a.*?data-type="(\w+)".*?data-id="(\w+)".*?>@(.*?)<\/a>/g, (match, p1, p2, p3) => {
    return '@' + (p1 === 'user' ? '1' : '2') + p2 + p3.replace(' ', '+') + '@';
  });
  description = description.replace(/<(div|p).*?>/g, '\n');
  description = description.replace(/<.*?>/g, '');
  description = description.replace(/&(nbsp|amp|lt|gt|quot|#039);/g, (m, p1) => {
    return {'nbsp': ' ', 'amp': '&', 'lt': '<', 'gt': '>', 'quot': '"', '#039': '\''}[p1];
  });
  description = description.replace(/ +>/g, ' ');
  description = description.trim();
  return description;
}
