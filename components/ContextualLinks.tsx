"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

interface ContextualLinkProps {
  topic: string;
  links: { label: string; url: string }[];
}

export default function ContextualLinks({ topic, links }: ContextualLinkProps) {
  return (
    <div className="mt-8 rounded-2xl bg-blue-50/50 p-6 border border-blue-100">
      <h3 className="text-sm font-semibold text-blue-900 mb-4 flex items-center">
        Learn more about {topic} on TaxVATPoint
      </h3>
      <ul className="space-y-3">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={`https://taxvatpoint.com${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center text-sm font-medium text-blue-600 hover:text-indigo-700"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2 text-blue-400 group-hover:text-indigo-500" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
