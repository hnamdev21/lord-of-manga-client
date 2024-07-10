type FastAccessColProps_1 = {
  title: string;
  fetch: false;
  data: Array<{
    label: string;
    href: string;
  }>;
};

type FastAccessColProps_2 = {
  title: string;
  fetch: true;
  prefix: string;
  fetchUrl: string;
};

export type FastAccessColProps = FastAccessColProps_1 | FastAccessColProps_2;
