export const renderHeaders = (
  keyPrefix: string,
  t: (key: string) => string
) => {
  const headers: JSX.Element[] = [];
  let i = 1;

  while (true) {
    const key = `${keyPrefix}.header${i}`;
    const value = t(key);

    // Stop if no translation found
    if (!value || value === key) break;

    headers.push(<span key={key}>{value}</span>);
    i++;
  }

  return headers.length > 0 ? (
    <p>
      {headers.map((line, index) => (
        <>
          {line}
          {index < headers.length - 1 && <br />}
        </>
      ))}
    </p>
  ) : null;
};

const TextSpan = ({ text }: { text: string }) => <span>{text}</span>;

const MarkedSpan = ({ text }: { text: string }) => (
  <span className="marked">{text}</span>
);

const parseMarkedText = (text: string, markedRegex: RegExp): JSX.Element[] => {
  const parts = text.split(markedRegex);
  return parts.map((part, index) =>
    markedRegex.test(part) ? (
      <MarkedSpan key={index} text={part} />
    ) : (
      <TextSpan key={index} text={part} />
    )
  );
};

const renderSubItems = (
  keyPrefix: string,
  parentIndex: number,
  markedRegex: RegExp,
  t: (key: string) => string
): JSX.Element[] => {
  const subItems: JSX.Element[] = [];
  let j = 1;

  while (true) {
    const subKey = `${keyPrefix}${parentIndex}.${j}`;
    const value = t(subKey);
    if (!value || value === subKey) break;

    subItems.push(
      <li key={subKey} className="list-[circle] marker:text-transparent pl-4">
        {parseMarkedText(value, markedRegex)}
      </li>
    );
    j++;
  }

  return subItems;
};

export const renderList = (
  keyPrefix: string,
  markedRegex: RegExp,
  t: (key: string) => string
): JSX.Element | null => {
  const items: JSX.Element[] = [];
  let i = 1;

  while (true) {
    const key = `${keyPrefix}${i}`;
    const value = t(key);
    if (!value || value === key) break;

    items.push(
      <li key={key}>
        {parseMarkedText(value, markedRegex)}
        <ul className="list-[circle] marker:text-transparent pl-4">
          {renderSubItems(keyPrefix, i, markedRegex, t)}
        </ul>
      </li>
    );
    i++;
  }

  return items.length > 0 ? (
    <div key={keyPrefix} className="mt-2.5">
      <h3 className="font-semibold mb-1">{t(keyPrefix)}</h3>
      <ul className="list-disc">{items}</ul>
    </div>
  ) : null;
};
