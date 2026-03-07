import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

export class MasterDataDictionaryDto {
  id: number;
  categoryCode: string;
  code: string;
  value: string;
  displayValue: string;
  parentId: number | null;
  sortOrder: number;
  isActive: boolean;
  description: string;
}

export class CreateMasterDataDictionaryDto {
  categoryCode: string;
  code: string;
  value: string;
  displayValue: string;
  parentId: number | null;
  sortOrder: number;
  isActive: boolean;
  description: string;

  constructor() {
    this.isActive = true;
    this.sortOrder = 0;
    this.parentId = null;
    this.displayValue = '';
    this.description = '';
  }
}

export class UpdateMasterDataDictionaryDto {
  id: number;
  categoryCode: string;
  code: string;
  value: string;
  displayValue: string;
  parentId: number | null;
  sortOrder: number;
  isActive: boolean;
  description: string;
}

export class PagedResultDtoOfMasterDataDictionary {
  totalCount: number;
  items: MasterDataDictionaryDto[];
}

@Injectable({ providedIn: 'root' })
export class MasterDataDictionaryServiceProxy {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.baseUrl = baseUrl ?? '';
  }

  getAll(
    keyword: string | undefined,
    categoryCode: string | undefined,
    isActive: boolean | null | undefined,
    skipCount: number | undefined,
    maxResultCount: number | undefined
  ): Observable<PagedResultDtoOfMasterDataDictionary> {
    let url = this.baseUrl + '/api/services/app/MasterDataDictionary/GetAll?';
    if (keyword !== undefined && keyword !== null) {
      url += 'Keyword=' + encodeURIComponent(keyword) + '&';
    }
    if (categoryCode !== undefined && categoryCode !== null) {
      url += 'CategoryCode=' + encodeURIComponent(categoryCode) + '&';
    }
    if (isActive !== undefined && isActive !== null) {
      url += 'IsActive=' + encodeURIComponent('' + isActive) + '&';
    }
    if (skipCount !== undefined && skipCount !== null) {
      url += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
    }
    if (maxResultCount !== undefined && maxResultCount !== null) {
      url += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
    }
    url = url.replace(/[?&]$/, '');

    return this.http.get<any>(url).pipe(
      map((response) => response.result as PagedResultDtoOfMasterDataDictionary)
    );
  }

  get(id: number): Observable<MasterDataDictionaryDto> {
    let url = this.baseUrl + '/api/services/app/MasterDataDictionary/Get?';
    url += 'Id=' + encodeURIComponent('' + id);
    return this.http.get<any>(url).pipe(
      map((response) => response.result as MasterDataDictionaryDto)
    );
  }

  create(body: CreateMasterDataDictionaryDto): Observable<MasterDataDictionaryDto> {
    const url = this.baseUrl + '/api/services/app/MasterDataDictionary/Create';
    return this.http.post<any>(url, body).pipe(
      map((response) => response.result as MasterDataDictionaryDto)
    );
  }

  update(body: UpdateMasterDataDictionaryDto): Observable<MasterDataDictionaryDto> {
    const url = this.baseUrl + '/api/services/app/MasterDataDictionary/Update';
    return this.http.put<any>(url, body).pipe(
      map((response) => response.result as MasterDataDictionaryDto)
    );
  }

  delete(id: number): Observable<void> {
    let url = this.baseUrl + '/api/services/app/MasterDataDictionary/Delete?';
    url += 'Id=' + encodeURIComponent('' + id);
    return this.http.delete<any>(url).pipe(
      map(() => undefined)
    );
  }
}
