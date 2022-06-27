import { FilterByPromoPipe } from './filterPromo.pipe';

describe('FilterByPromoPipe', () => {
  let pipe: FilterByPromoPipe;

  beforeEach(() => {
    pipe = new FilterByPromoPipe();
  });

  it('should be instanced', () => {
    expect(pipe).toBeDefined();
  });

  it('should return an empty array if no items', () => {
    const items = null;

    const filtered = pipe.transform(items, 'field');

    expect(filtered.length).toBe(0);
    expect(filtered).toEqual([]);
  });

  it('should return items if no field is given', () => {
    const items = [];
    items.push({ id: 1, title: 'Blog 1' });

    const filtered = pipe.transform(items, null);

    expect(filtered).toEqual(items);
  });

  it('should return an empty array if not given correct field', () => {
    const items = [];

    items.push({ id: 1, title: 'Blog 1' });
    items.push({ id: 2, title: 'Blog 2' });
    items.push({ id: 3, title: 'Blog 3' });
    items.push({ id: 4, title: 'blog 4' });

    const filtered = pipe.transform(items, 'post');

    expect(filtered.length).toBe(0);
  });

  it('should filter correctly, if title contains field', () => {
    const items = [];

    items.push({ id: 1, title: 'Blog 1' });
    items.push({ id: 2, title: 'Blog item 2' });
    items.push({ id: 3, title: 'Blog 3' });
    items.push({ id: 4, title: 'post 4' });

    const filtered = pipe.transform(items, 'blog');

    expect(filtered.length).toBe(3);
  });
});
