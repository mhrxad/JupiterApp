import {environment} from '../../environments/environment';

export const DomainName = environment.production ? 'https://SiteUrl.com' : 'https://localhost:5001';
export const ImagePath = DomainName + '/images/products/origin/';
export const ImageGalleryPath = DomainName + '/images/product-galleries/';

