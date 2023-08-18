export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Hospital {
  id: string;
  createTime: string;
  param: {
    hostypeString: string;
    fullAddress: string;
  };
  hosname: string;
  status: number;
  bookingRule: {
    cycle: number;
    rule: string[];
  };
}

export type HosContent = Hospital[];

export interface HosResponseData extends ResponseData {
  data: {
    content: HosContent;
    size: number;
    totalPages: number;
  };
}
