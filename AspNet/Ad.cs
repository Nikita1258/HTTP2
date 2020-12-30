using System;
using System.Collections.Generic;

namespace AspNet
{
    public class Ad
    {
        public int Id { get; set; }

        public string Title { get;set; }

        public string Author { get;set; }

        public string Text { get; set; }

        public Contacts Contacts { get; set; }

        public DateTime Date { get; set; }
    }

    public class Contacts
    {
        public string Email { get; set; }

        public string Telephone { get; set; }

        public string Address { get; set; }
    }
}
