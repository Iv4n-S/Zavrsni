using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace ZavrsniApi
{
    public partial class ZavrsniContext : DbContext
    {
        public ZavrsniContext()
        {
        }

        public ZavrsniContext(DbContextOptions<ZavrsniContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Bookingtype> Bookingtype { get; set; }
        public virtual DbSet<Hotel> Hotel { get; set; }
        public virtual DbSet<Hotelroomimages> Hotelroomimages { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Occupieditem> Occupieditem { get; set; }
        public virtual DbSet<Timeslots> Timeslots { get; set; }
        public virtual DbSet<Transport> Transport { get; set; }
        public virtual DbSet<Transporttypes> Transporttypes { get; set; }
        public virtual DbSet<Userdata> Userdata { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("User ID=postgres;Password=bazepodataka;Server=localhost;Port=5432;Database=Zavrsni;Integrated Security=true;Pooling=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(e => e.Idbooking)
                    .HasName("booking_pkey");

                entity.ToTable("booking");

                entity.Property(e => e.Idbooking)
                    .HasColumnName("idbooking")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idbookingtype).HasColumnName("idbookingtype");

                entity.Property(e => e.Idhotel).HasColumnName("idhotel");

                entity.Property(e => e.Idhotelroom).HasColumnName("idhotelroom");

                entity.Property(e => e.Idtimeslot).HasColumnName("idtimeslot");

                entity.Property(e => e.Idtransport).HasColumnName("idtransport");

                entity.Property(e => e.Iduser).HasColumnName("iduser");

                entity.Property(e => e.Timecreated).HasColumnName("timecreated");

                entity.HasOne(d => d.IdbookingtypeNavigation)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.Idbookingtype)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("booking_idbookingtype_fkey");

                entity.HasOne(d => d.IdhotelroomNavigation)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.Idhotelroom)
                    .HasConstraintName("booking_idhotelroom_fkey");

                entity.HasOne(d => d.IdtimeslotNavigation)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.Idtimeslot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("booking_idtimeslot_fkey");

                entity.HasOne(d => d.IdtransportNavigation)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.Idtransport)
                    .HasConstraintName("booking_idtransport_fkey");

                entity.HasOne(d => d.IduserNavigation)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.Iduser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("booking_iduser_fkey");
            });

            modelBuilder.Entity<Bookingtype>(entity =>
            {
                entity.HasKey(e => e.Idbookingtype)
                    .HasName("bookingtype_pkey");

                entity.ToTable("bookingtype");

                entity.Property(e => e.Idbookingtype)
                    .HasColumnName("idbookingtype")
                    .ValueGeneratedNever();

                entity.Property(e => e.Bookingtypename)
                    .IsRequired()
                    .HasColumnName("bookingtypename")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.HasKey(e => e.Idhotelroom)
                    .HasName("hotel_pkey");

                entity.ToTable("hotel");

                entity.Property(e => e.Idhotelroom)
                    .HasColumnName("idhotelroom")
                    .ValueGeneratedNever();

                entity.Property(e => e.Hotelname)
                    .IsRequired()
                    .HasColumnName("hotelname")
                    .HasMaxLength(50);

                entity.Property(e => e.Hotelroomcapacity).HasColumnName("hotelroomcapacity");

                entity.Property(e => e.Hotelroomdesc)
                    .IsRequired()
                    .HasColumnName("hotelroomdesc")
                    .HasMaxLength(2048);

                entity.Property(e => e.IdHotel).HasColumnName("idHotel");

                entity.Property(e => e.Idlocation).HasColumnName("idlocation");

                entity.Property(e => e.Stars).HasColumnName("stars");

                entity.HasOne(d => d.IdlocationNavigation)
                    .WithMany(p => p.Hotel)
                    .HasForeignKey(d => d.Idlocation)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("hotel_idlocation_fkey");
            });

            modelBuilder.Entity<Hotelroomimages>(entity =>
            {
                entity.HasKey(e => e.Idimage)
                    .HasName("hotelroomimages_pkey");

                entity.ToTable("hotelroomimages");

                entity.Property(e => e.Idimage)
                    .HasColumnName("idimage")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idhotelroom).HasColumnName("idhotelroom");

                entity.Property(e => e.Imagename)
                    .IsRequired()
                    .HasColumnName("imagename")
                    .HasMaxLength(1024);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.Idlocation)
                    .HasName("location_pkey");

                entity.ToTable("location");

                entity.Property(e => e.Idlocation)
                    .HasColumnName("idlocation")
                    .ValueGeneratedNever();

                entity.Property(e => e.Locationname)
                    .IsRequired()
                    .HasColumnName("locationname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Occupieditem>(entity =>
            {
                entity.HasKey(e => e.Idoccupieditem)
                    .HasName("occupieditem_pkey");

                entity.ToTable("occupieditem");

                entity.Property(e => e.Idoccupieditem)
                    .HasColumnName("idoccupieditem")
                    .ValueGeneratedNever();

                entity.Property(e => e.Idbooking).HasColumnName("idbooking");

                entity.Property(e => e.Idbookingitem).HasColumnName("idbookingitem");

                entity.Property(e => e.Idtimeslot).HasColumnName("idtimeslot");

                entity.HasOne(d => d.IdbookingNavigation)
                    .WithMany(p => p.Occupieditem)
                    .HasForeignKey(d => d.Idbooking)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("occupieditem_idbooking_fkey");

                entity.HasOne(d => d.IdtimeslotNavigation)
                    .WithMany(p => p.Occupieditem)
                    .HasForeignKey(d => d.Idtimeslot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("occupieditem_idtimeslot_fkey");
            });

            modelBuilder.Entity<Timeslots>(entity =>
            {
                entity.HasKey(e => e.Idtimeslot)
                    .HasName("timeslots_pkey");

                entity.ToTable("timeslots");

                entity.Property(e => e.Idtimeslot)
                    .HasColumnName("idtimeslot")
                    .ValueGeneratedNever();

                entity.Property(e => e.Itemdate)
                    .HasColumnName("itemdate")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<Transport>(entity =>
            {
                entity.HasKey(e => e.Idtransport)
                    .HasName("transport_pkey");

                entity.ToTable("transport");

                entity.Property(e => e.Idtransport)
                    .HasColumnName("idtransport")
                    .ValueGeneratedNever();

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.DepartureTime)
                    .IsRequired()
                    .HasColumnName("departureTime")
                    .HasMaxLength(50);

                entity.Property(e => e.Idlocationfrom).HasColumnName("idlocationfrom");

                entity.Property(e => e.Idlocationto).HasColumnName("idlocationto");

                entity.Property(e => e.Idtransporttype).HasColumnName("idtransporttype");

                entity.Property(e => e.Transportname)
                    .IsRequired()
                    .HasColumnName("transportname")
                    .HasMaxLength(100);

                entity.HasOne(d => d.IdlocationfromNavigation)
                    .WithMany(p => p.TransportIdlocationfromNavigation)
                    .HasForeignKey(d => d.Idlocationfrom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("transport_idlocationfrom_fkey");

                entity.HasOne(d => d.IdlocationtoNavigation)
                    .WithMany(p => p.TransportIdlocationtoNavigation)
                    .HasForeignKey(d => d.Idlocationto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("transport_idlocationto_fkey");

                entity.HasOne(d => d.IdtransporttypeNavigation)
                    .WithMany(p => p.Transport)
                    .HasForeignKey(d => d.Idtransporttype)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("transport_idtransporttype_fkey");
            });

            modelBuilder.Entity<Transporttypes>(entity =>
            {
                entity.HasKey(e => e.Idtransporttype)
                    .HasName("transporttypes_pkey");

                entity.ToTable("transporttypes");

                entity.Property(e => e.Idtransporttype)
                    .HasColumnName("idtransporttype")
                    .ValueGeneratedNever();

                entity.Property(e => e.Transporttypename)
                    .IsRequired()
                    .HasColumnName("transporttypename")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Userdata>(entity =>
            {
                entity.HasKey(e => e.Iduser)
                    .HasName("userdata_pkey");

                entity.ToTable("userdata");

                entity.HasIndex(e => e.Email)
                    .HasName("userdata_email_key")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("userdata_username_key")
                    .IsUnique();

                entity.Property(e => e.Iduser)
                    .HasColumnName("iduser")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50);

                entity.Property(e => e.Phonenumber)
                    .IsRequired()
                    .HasColumnName("phonenumber")
                    .HasMaxLength(25);

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasColumnName("role")
                    .HasMaxLength(25);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname")
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(25);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
