import { updateFileList, file2Obj, removeFileItem, attrAccept } from '../upload/file';
import { UploadFile } from '../../entities/components/upload';
import type { WcFile } from '../../entities/components';

describe('Upload Utils', () => {
  // helper to create a WcFile mock using the native File API and type assertion
  const createMockFile = (name: string, type: string): WcFile => {
    // eslint-disable-next-line no-undef
    const file = new File(['dummy content'], name, { type }) as unknown as WcFile;
    (file as any).uid = `${Date.now()}-${name}`;
    return file;
  };

  describe('updateFileList', () => {
    it('should add a new file when uid is not found', () => {
      const mockFile: UploadFile = { uid: '1', name: 'file1.txt' } as any;
      const list: UploadFile[] = [];
      const result = updateFileList(mockFile, list);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe(mockFile);
    });

    it('should replace existing file when uid matches', () => {
      const mockFileOld: UploadFile = { uid: '1', name: 'file1.txt', status: 'uploading' } as any;
      const mockFileNew: UploadFile = { uid: '1', name: 'file1.txt', status: 'done' } as any;
      const list: UploadFile[] = [mockFileOld];
      const result = updateFileList(mockFileNew, list);
      expect(result).toHaveLength(1);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(result[0].status).toBe('done');
    });
  });

  describe('file2Obj', () => {
    it('should convert WcFile to UploadFile with extra props', () => {
      const wcFile = createMockFile('image.png', 'image/png');
      const uploadObj = file2Obj(wcFile);
      expect(uploadObj.name).toBe('image.png');
      expect(uploadObj.type).toBe('image/png');
      expect(uploadObj.percent).toBe(0);
      expect(uploadObj.originFileObj).toBe(wcFile);
      expect(uploadObj.uid).toBe(wcFile.uid);
    });
  });

  describe('removeFileItem', () => {
    it('should remove the matched file by uid', () => {
      const file1: UploadFile = { uid: '1', name: 'a.txt' } as any;
      const file2: UploadFile = { uid: '2', name: 'b.txt' } as any;
      const result = removeFileItem(file1, [file1, file2]);
      expect(result).toHaveLength(1);
      // @ts-expect-error TYPE_FIXME. Please Fix the below strict mode type error. Read https://bytedance.sg.larkoffice.com/docx/MIsKdGOQwoQsnuxrsxEl6AsYgCf
      expect(result?.[0].uid).toBe('2');
    });

    it('should return null when file not found', () => {
      const file1: UploadFile = { uid: '1', name: 'a.txt' } as any;
      const result = removeFileItem(file1, []);
      expect(result).toBeNull();
    });
  });

  describe('attrAccept', () => {
    const jpgFile = createMockFile('photo.JPG', 'image/jpeg');
    const pngFile = createMockFile('icon.png', 'image/png');
    const jsonFile = createMockFile('data.json', 'application/json');

    it('should accept any file when accept is *', () => {
      expect(attrAccept(jpgFile, '*')).toBe(true);
      expect(attrAccept(jsonFile, '*')).toBe(true);
    });

    it('should match by extension (case insensitive)', () => {
      expect(attrAccept(jpgFile, '.jpg')).toBe(true);
      expect(attrAccept(jpgFile, '.jpeg')).toBe(true);
      expect(attrAccept(pngFile, '.jpg')).toBe(false);
    });

    it('should match mime group image/*', () => {
      expect(attrAccept(pngFile, 'image/*')).toBe(true);
      expect(attrAccept(jsonFile, 'image/*')).toBe(false);
    });

    it('should match exact mime type', () => {
      expect(attrAccept(jsonFile, 'application/json')).toBe(true);
      expect(attrAccept(jsonFile, 'text/plain')).toBe(false);
    });

    it('should handle array of accept strings', () => {
      expect(attrAccept(jpgFile, ['.png', '.jpg'])).toBe(true);
      expect(attrAccept(jsonFile, ['.png', 'application/json'])).toBe(true);
    });
  });
});
