import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusIndicator } from './StatusIndicator';

interface CatalogItemProps {
  id: string;
  name: string;
  catalogId: string;
  owner: string;
  status: string;
  statusColor: string;
  avatarSrc: string;
  catalogType?: string;
  onDelete: (id: string) => void;
}

const getCatalogTypeIcon = (catalogType?: string) => {
  switch (catalogType) {
    case 'ecommerce':
      return (
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.669414 6.15287C0.720933 5.22552 1.48793 4.49994 2.41672 4.49994H15.9977C16.9265 4.49994 17.6935 5.22552 17.745 6.15287L18.4116 18.1529C18.4674 19.156 17.669 19.9999 16.6643 19.9999H1.75005C0.745405 19.9999 -0.0529776 19.156 0.00274993 18.1529L0.669414 6.15287ZM2.65322 6.49994L2.01433 17.9999H16.4001L15.7612 6.49994H2.65322Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.20722 2C7.27424 2 5.70724 3.567 5.70724 5.5H3.70724C3.70724 2.46244 6.16966 0 9.20722 0C12.2448 0 14.7072 2.46244 14.7072 5.5H12.7072C12.7072 3.567 11.1402 2 9.20722 2Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.20721 11.2499C11.1402 11.2499 12.7072 9.68295 12.7072 7.74995H14.7072C14.7072 10.7875 12.2448 13.2499 9.20721 13.2499C6.16965 13.2499 3.70723 10.7875 3.70723 7.74995H5.70723C5.70723 9.68295 7.27423 11.2499 9.20721 11.2499Z" fill="#A9ABAC"/>
        </svg>
      );
    case 'destination':
      return (
        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M15.4976 0.0717902C16.0104 -0.13332 16.5924 0.116079 16.7975 0.628844L18.2068 4.15174H19.9823C20.5346 4.15174 20.9823 4.59945 20.9823 5.15174V7.99909C20.9823 8.55137 20.5346 8.99909 19.9823 8.99909C18.9325 8.99909 18.135 9.66346 18.135 10.6092C18.135 11.153 18.3705 11.6852 18.7507 12.0866C19.137 12.4943 19.5998 12.6938 19.9823 12.6938C20.5346 12.6938 20.9823 13.1415 20.9823 13.6938V16.5411C20.9823 17.0934 20.5346 17.5411 19.9823 17.5411H1C0.447715 17.5411 0 17.0934 0 16.5411V13.6938C0 13.1415 0.447715 12.6938 1 12.6938C1.49881 12.6938 1.96488 12.5264 2.29321 12.2345C2.60314 11.9591 2.84735 11.5242 2.84735 10.8464C2.84735 10.1687 2.60313 9.73384 2.29319 9.45833C1.96484 9.16647 1.49877 8.99909 1 8.99909C0.447715 8.99909 0 8.55137 0 7.99909V5.15174C0 4.59945 0.447715 4.15174 1 4.15174H5.29784L15.4976 0.0717902ZM5.46777 6.15174C5.48305 6.15209 5.49836 6.15209 5.5137 6.15174H17.5071C17.5224 6.15209 17.5377 6.15209 17.5531 6.15174H18.9823V7.12297C17.502 7.48996 16.135 8.66864 16.135 10.6092C16.135 11.7263 16.6113 12.7364 17.2988 13.4621C17.7548 13.9434 18.3359 14.332 18.9823 14.5365V15.5411H2V14.5723C2.58618 14.4272 3.14875 14.15 3.62195 13.7294C4.37976 13.0557 4.84735 12.0669 4.84735 10.8464C4.84735 9.62596 4.37973 8.63713 3.62192 7.96352C3.14872 7.5429 2.58616 7.26565 2 7.12054V6.15174H5.46777ZM16.0527 4.15174H10.683L15.312 2.30012L16.0527 4.15174ZM6.07795 9.30279C6.07795 8.75051 6.52567 8.30279 7.07795 8.30279H10.0621C10.6144 8.30279 11.0621 8.75051 11.0621 9.30279C11.0621 9.85508 10.6144 10.3028 10.0621 10.3028H7.07795C6.52567 10.3028 6.07795 9.85508 6.07795 9.30279ZM6.07795 12.2871C6.07795 11.7348 6.52567 11.2871 7.07795 11.2871H14.041C14.5933 11.2871 15.041 11.7348 15.041 12.2871C15.041 12.8394 14.5933 13.2871 14.041 13.2871H7.07795C6.52567 13.2871 6.07795 12.8394 6.07795 12.2871Z" fill="#A9ABAC"/>
        </svg>
      );
    case 'hotel':
      return (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 18H0V16H1V1C1 0.44772 1.44772 0 2 0H16C16.5523 0 17 0.44772 17 1V6H19V16H20V18ZM15 16H17V8H11V16H13V10H15V16ZM15 6V2H3V16H9V6H15ZM5 8H7V10H5V8ZM5 12H7V14H5V12ZM5 4H7V6H5V4Z" fill="#A9ABAC"/>
        </svg>
      );
    case 'flight':
      return (
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.4969 1.2018C15.625 0.441359 17.5834 -0.547961 19.5506 0.368791L19.741 0.463517L19.867 0.536759C20.1545 0.717009 20.392 0.968581 20.5565 1.26723L20.6561 1.45766C21.614 3.4332 20.6077 5.41178 19.8465 6.53676C19.18 7.52151 18.3152 8.42919 17.577 9.13539L17.5779 17.4225L17.5682 17.6217C17.5223 18.0815 17.3178 18.5139 16.9871 18.8424L16.4959 19.3297C16.0317 19.7904 15.3707 19.9959 14.7274 19.8786C14.1644 19.7758 13.6767 19.4372 13.3817 18.9557L13.2674 18.7409L11.3992 14.6491L10.1883 15.7243L10.2264 18.4645C10.2329 18.9381 10.0708 19.3973 9.77326 19.7604L9.63654 19.9098L9.12189 20.4225C8.65715 20.8848 7.99518 21.0896 7.35041 20.9713C6.70539 20.8529 6.15868 20.4263 5.88849 19.8288L5.47052 18.9049L5.05353 19.1393C4.33475 19.5429 3.44154 19.4643 2.80451 18.9411C2.16771 18.4178 1.91748 17.5574 2.17365 16.7741L2.51252 15.736L1.16193 15.1129C0.568151 14.839 0.145966 14.2918 0.0310711 13.6481C-0.0836733 13.0044 0.123411 12.3448 0.585759 11.8825L1.11603 11.3512L1.2674 11.2155C1.63337 10.9174 2.0958 10.7565 2.57209 10.7663L5.33283 10.8219L6.3797 9.6432L2.284 7.79067C1.68742 7.5207 1.26038 6.97561 1.14142 6.33168C1.02265 5.68794 1.22673 5.02635 1.68732 4.56117L2.1922 4.05141L2.33966 3.91664C2.69634 3.6221 3.14643 3.45872 3.6131 3.45863H11.9022C12.6078 2.72269 13.5133 1.86493 14.4969 1.2018ZM18.8045 2.2311C17.1269 1.3427 14.8802 3.24706 13.3709 4.81606L12.7733 5.45863H3.6131L3.10822 5.9684L9.67853 8.94106L6.21466 12.8414L2.53107 12.7663L1.99982 13.2965L4.96662 14.6657L4.07404 17.3961L6.39533 16.0924L7.71174 19.0045L8.22638 18.4918L8.1756 14.8375L12.0945 11.3571L15.0867 17.9108L15.5779 17.4235L15.577 8.2643C17.1419 6.85195 19.6889 4.3024 18.8924 2.41176L18.8045 2.2311Z" fill="#A9ABAC"/>
        </svg>
      );
    case 'local-services':
      return (
        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M8.62496 18.7631L13.633 12.9737C15.908 10.3439 15.7664 6.40141 13.3089 3.94191C10.7218 1.3527 6.52808 1.3527 3.94102 3.94191C1.48356 6.40141 1.34194 10.3439 3.61688 12.9737L8.62496 18.7631ZM14.7237 2.52829C11.3555 -0.842763 5.89446 -0.842763 2.52621 2.52829C-0.672221 5.72939 -0.856376 10.8597 2.10429 14.2822L7.45112 20.4632C8.07029 21.1789 9.17963 21.1789 9.7988 20.4632L15.1456 14.2822C18.1063 10.8597 17.9221 5.72939 14.7237 2.52829Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8.62191 10.1007C9.53224 10.1007 10.273 9.36169 10.273 8.44654C10.273 7.53139 9.53224 6.79236 8.62191 6.79236C7.71159 6.79236 6.97078 7.53139 6.97078 8.44654C6.97078 9.36169 7.71159 10.1007 8.62191 10.1007ZM8.62191 12.1007C10.6384 12.1007 12.273 10.4647 12.273 8.44654C12.273 6.42839 10.6384 4.79236 8.62191 4.79236C6.60545 4.79236 4.97078 6.42839 4.97078 8.44654C4.97078 10.4647 6.60545 12.1007 8.62191 12.1007Z" fill="#A9ABAC"/>
        </svg>
      );
    case 'media-entertainment':
      return (
        <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.3182 10.4693L10.5877 7.71324C10.0926 7.34748 9.39205 7.70092 9.39205 8.31647V13.8286C9.39205 14.4441 10.0926 14.7976 10.5877 14.4318L14.3182 11.6758C14.7239 11.376 14.7239 10.7691 14.3182 10.4693Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 2.49999C0 1.11929 1.11928 0 2.49999 0H20.4999C21.8806 0 22.9999 1.11929 22.9999 2.49999V16C22.9999 17.3807 21.8806 18.5 20.4999 18.5H2.49999C1.11928 18.5 0 17.3807 0 16V2.49999ZM2.49999 2C2.22386 2 2 2.22385 2 2.49999V16C2 16.2761 2.22385 16.5 2.49999 16.5H20.4999C20.7761 16.5 20.9999 16.2761 20.9999 16V2.49999C20.9999 2.22385 20.7761 2 20.4999 2H2.49999Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M21.2499 6.5H1.74999V4.5H21.2499V6.5Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M10.7581 1.83465L7.00816 6.15545L5.4977 4.84453L9.24768 0.523734L10.7581 1.83465Z" fill="#A9ABAC"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M18.2557 1.83464L14.5057 6.15544L12.9953 4.84452L16.7453 0.523721L18.2557 1.83464Z" fill="#A9ABAC"/>
        </svg>
      );
    default:
      // Default icon (fallback for types without specific icons)
      return (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 18H0V16H1V1C1 0.44772 1.44772 0 2 0H16C16.5523 0 17 0.44772 17 1V6H19V16H20V18ZM15 16H17V8H11V16H13V10H15V16ZM15 6V2H3V16H9V6H15ZM5 8H7V10H5V8ZM5 12H7V14H5V12ZM5 4H7V6H5V4Z" fill="#A9ABAC"/>
        </svg>
      );
  }
};

export const CatalogItem: React.FC<CatalogItemProps> = ({
  id,
  name,
  catalogId,
  owner,
  status,
  statusColor,
  avatarSrc,
  catalogType,
  onDelete
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalog/${id}/overview`);
  };

  return (
    <article 
      className="items-center border flex w-full gap-4 overflow-hidden flex-wrap bg-white p-4 rounded-xl border-solid border-[#D3D4D5] hover:border-[#009995] transition-colors max-md:max-w-full relative group cursor-pointer"
      onClick={handleClick}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          display: 'inline-flex',
          width: '36px',
          height: '36px',
          padding: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          borderRadius: '4px',
          border: '1px solid var(--ks-color-neutral-fill, #87898B)',
          background: 'var(--ks-color-neutral-surface1, #F8F8F9)',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#EAEAEA';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--ks-color-neutral-surface1, #F8F8F9)';
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6.74854 7.6626C7.16275 7.6626 7.49854 7.99838 7.49854 8.4126V12.6909C7.49844 13.1051 7.16269 13.4409 6.74854 13.4409C6.33448 13.4408 5.99863 13.105 5.99854 12.6909V8.4126C5.99854 7.99846 6.33443 7.66272 6.74854 7.6626Z" fill="#121415"/>
          <path d="M9.25635 7.66162C9.67023 7.66183 10.0061 7.99775 10.0063 8.41162V12.6899C10.0063 13.104 9.67039 13.4397 9.25635 13.4399C8.84213 13.4399 8.50635 13.1042 8.50635 12.6899V8.41162C8.5066 7.99762 8.84229 7.66162 9.25635 7.66162Z" fill="#121415"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.03662 0.214355C9.25366 0.241692 9.44961 0.363466 9.5708 0.549316L10.5737 2.0874C10.6265 2.16836 10.6608 2.25595 10.6792 2.34521H13.2642C13.818 2.34521 14.2671 2.79428 14.2671 3.34814V5.00146L14.2622 5.104C14.2139 5.57579 13.8386 5.95082 13.3667 5.99854L13.2642 6.00439H12.9194L12.1011 14.8442L12.0874 14.9429C11.9971 15.431 11.5872 15.7915 11.103 15.7915H4.89697L4.80127 15.7876C4.3595 15.7438 3.99691 15.3986 3.9126 14.9429L3.89893 14.8442L3.08057 6.00439H2.73584L2.6333 5.99854C2.16153 5.95064 1.78602 5.57567 1.73779 5.104L1.73291 5.00146V3.34814C1.73291 2.82888 2.12758 2.40143 2.6333 2.3501L2.73584 2.34521H5.32178C5.34022 2.25603 5.37355 2.1683 5.42627 2.0874L6.4292 0.549316L6.48486 0.473145C6.62626 0.306395 6.83538 0.208561 7.05713 0.208496H8.94287L9.03662 0.214355ZM5.354 14.2915H10.646L11.4136 6.01123H4.58643L5.354 14.2915ZM3.23291 4.50439H12.7671V3.84521H3.23291V4.50439ZM7.04834 2.34521H8.95166L8.53662 1.7085H7.46338L7.04834 2.34521Z" fill="#121415"/>
        </svg>
      </button>
      <div className="items-center flex gap-2 w-8 rounded-md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {getCatalogTypeIcon(catalogType)}
      </div>
      <div className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
        <header className="items-stretch flex w-full flex-col max-md:max-w-full">
          <div className="items-center flex gap-1 text-base text-[#121415] font-medium tracking-[0.03px]">
            <h3 className="text-[#121415]">
              {name}
            </h3>
          </div>
          <div className="text-[#6D6E70] text-sm font-normal leading-none tracking-[0.09px] mt-1 max-md:max-w-full">
            ID: {catalogId}
          </div>
        </header>
        <div className="items-center flex min-h-6 w-full gap-1 flex-wrap mt-3 max-md:max-w-full">
          <div className="text-sm text-[#121415] font-normal tracking-[0.09px] leading-none w-[71px]">
            Owned by:
          </div>
          <div className="items-center flex min-w-60 gap-4">
            <div className="items-center flex gap-2 text-sm text-[#6D6E70] font-normal tracking-[0.09px] leading-none rounded-md">
              <div className="justify-center items-center flex flex-col gap-0.5">
                <div className="text-[#6D6E70] text-ellipsis">
                  {owner}
                </div>
              </div>
            </div>
            {status && (
              <StatusIndicator 
                status={status}
                color={statusColor}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
